import { useState, useRef, useCallback, useEffect } from 'react';
import { Mic, Square, Trash2, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AudioRecorderProps {
  onRecorded: (url: string) => void;
  onClear: () => void;
  audioUrl: string | null;
}

export default function AudioRecorder({ onRecorded, onClear, audioUrl }: AudioRecorderProps) {
  const { t } = useLanguage();
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      mediaRecorder.current?.stream?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      chunks.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.current.push(e.data); };
      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        await uploadFile(blob, 'audio');
      };
      recorder.start();
      mediaRecorder.current = recorder;
      setRecording(true);
      setDuration(0);
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    } catch {
      toast.error(t('micPermissionDenied'));
    }
  }, [t]);

  const stopRecording = useCallback(() => {
    mediaRecorder.current?.stop();
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const uploadFile = async (blob: Blob, type: 'audio' | 'video') => {
    setUploading(true);
    const ext = type === 'audio' ? 'webm' : 'webm';
    const path = `${type}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from('media').upload(path, blob, {
      contentType: type === 'audio' ? 'audio/webm' : 'video/webm',
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

  const togglePlay = () => {
    if (!audioRef.current || !audioUrl) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (audioUrl) {
    return (
      <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-xl border border-primary/20">
        <audio ref={audioRef} src={audioUrl} onEnded={() => setPlaying(false)} />
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={togglePlay}>
          {playing ? <Pause className="h-4 w-4 text-primary" /> : <Play className="h-4 w-4 text-primary" />}
        </Button>
        <div className="flex-1">
          <div className="h-1.5 bg-primary/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-full" />
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onClear}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    );
  }

  if (recording) {
    return (
      <div className="flex items-center gap-3 p-2 bg-destructive/5 rounded-xl border border-destructive/20">
        <div className="h-3 w-3 rounded-full bg-destructive animate-pulse" />
        <span className="text-sm font-mono text-destructive">{formatTime(duration)}</span>
        <span className="text-xs text-muted-foreground flex-1">{t('recording')}</span>
        <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full" onClick={stopRecording}>
          <Square className="h-3.5 w-3.5" />
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
      <Mic className="h-4 w-4" />
    </Button>
  );
}
