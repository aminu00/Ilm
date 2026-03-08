import { useState, useRef, useCallback, useEffect } from 'react';
import { Video, Square, Trash2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface VideoRecorderProps {
  onRecorded: (url: string) => void;
  onClear: () => void;
  videoUrl: string | null;
}

export default function VideoRecorder({ onRecorded, onClear, videoUrl }: VideoRecorderProps) {
  const { t } = useLanguage();
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [duration, setDuration] = useState(0);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const previewRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (previewRef.current) {
        previewRef.current.srcObject = stream;
        previewRef.current.play();
      }
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      chunks.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.current.push(e.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        if (previewRef.current) previewRef.current.srcObject = null;
        const blob = new Blob(chunks.current, { type: 'video/webm' });
        await uploadFile(blob);
      };
      recorder.start();
      mediaRecorder.current = recorder;
      setRecording(true);
      setDuration(0);
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    } catch {
      toast.error(t('cameraPermissionDenied'));
    }
  }, [t]);

  const stopRecording = useCallback(() => {
    mediaRecorder.current?.stop();
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const uploadFile = async (blob: Blob) => {
    setUploading(true);
    const path = `video/${crypto.randomUUID()}.webm`;
    const { error } = await supabase.storage.from('media').upload(path, blob, {
      contentType: 'video/webm',
    });
    setUploading(false);
    if (error) {
      toast.error(t('uploadFailed'));
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(path);
    onRecorded(publicUrl);
    toast.success(t('recordingSaved'));
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (videoUrl) {
    return (
      <div className="space-y-2">
        <video controls className="w-full rounded-xl max-h-48" src={videoUrl} />
        <Button variant="ghost" size="sm" className="text-destructive" onClick={onClear}>
          <Trash2 className="h-3.5 w-3.5 mr-1.5" />
          {t('delete')}
        </Button>
      </div>
    );
  }

  if (recording) {
    return (
      <div className="space-y-2">
        <div className="relative rounded-xl overflow-hidden bg-muted">
          <video ref={previewRef} muted className="w-full max-h-48 object-cover" />
          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-destructive/90 text-destructive-foreground px-2 py-0.5 rounded-full text-xs">
            <div className="h-2 w-2 rounded-full bg-destructive-foreground animate-pulse" />
            {formatTime(duration)}
          </div>
        </div>
        <Button variant="destructive" size="sm" className="w-full rounded-full" onClick={stopRecording}>
          <Square className="h-3.5 w-3.5 mr-1.5" />
          {t('stopRecording')}
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={startRecording}
      disabled={uploading}
    >
      <Video className="h-4 w-4" />
    </Button>
  );
}
