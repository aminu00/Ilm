import { useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const reminders = [
  {
    type: 'hadith',
    text: {
      en: '"Whoever takes a path in search of knowledge, Allah will make easy for him the path to Paradise."',
      ar: '"من سلك طريقًا يلتمس فيه علمًا سهّل الله له به طريقًا إلى الجنة."',
      yo: '"Ẹnikẹ́ni tó bá gbà ọ̀nà kan láti wá ìmọ̀, Allāh yóò mú ọ̀nà sí Aljanna rọrùn fún un."',
      ha: '"Duk wanda ya bi hanya don neman ilimi, Allah zai sauƙaƙe masa hanya zuwa Aljanna."',
      ig: '"Onye ọ bụla si na ụzọ ịchọ ihe ọmụma, Chineke ga-eme ka ụzọ ịga Paradise dị mfe."',
      pcm: '"Anybody wey follow road find knowledge, Allah go make road to Paradise easy for am."',
    },
    source: {
      en: '— Sahih Muslim',
      ar: '— صحيح مسلم',
      yo: '— Sahih Muslim',
      ha: '— Sahih Muslim',
      ig: '— Sahih Muslim',
      pcm: '— Sahih Muslim',
    },
  },
  {
    type: 'quran',
    text: {
      en: '"Read! In the name of your Lord who created."',
      ar: '"اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ"',
      yo: '"Ka! Ní orúkọ Olúwa rẹ tí ó dá."',
      ha: '"Ka! Da sunan Ubangijinka wanda ya halitta."',
      ig: '"Gụọ! N\'aha Onyenwe gị onye kere."',
      pcm: '"Read! For di name of your Lord wey create."',
    },
    source: {
      en: '— Surah Al-Alaq 96:1',
      ar: '— سورة العلق ٩٦:١',
      yo: '— Surah Al-Alaq 96:1',
      ha: '— Surah Al-Alaq 96:1',
      ig: '— Surah Al-Alaq 96:1',
      pcm: '— Surah Al-Alaq 96:1',
    },
  },
  {
    type: 'hadith',
    text: {
      en: '"The best among you are those who learn the Quran and teach it."',
      ar: '"خيركم من تعلّم القرآن وعلّمه."',
      yo: '"Ẹni tó dára jùlọ nínú yín ni ẹni tó kọ́ Al-Qur\'ān tí ó sì kọ́ ẹlòmíì."',
      ha: '"Mafi alhairin ku shi ne wanda ya koyi Alƙur\'ani ya kuma koyar da shi."',
      ig: '"Onye kacha mma n\'etiti unu bụ onye mụtara Quran ma kuziere ya."',
      pcm: '"Di best among una na person wey learn Quran and teach am."',
    },
    source: {
      en: '— Sahih Al-Bukhari',
      ar: '— صحيح البخاري',
      yo: '— Sahih Al-Bukhari',
      ha: '— Sahih Al-Bukhari',
      ig: '— Sahih Al-Bukhari',
      pcm: '— Sahih Al-Bukhari',
    },
  },
  {
    type: 'quran',
    text: {
      en: '"Indeed, with hardship comes ease."',
      ar: '"فَإِنَّ مَعَ الْعُسْرِ يُسْرًا"',
      yo: '"Nítòótọ́, pẹ̀lú ìṣòro ìrọ̀rùn wà."',
      ha: '"Lalle tare da wahala akwai sauƙi."',
      ig: '"N\'ezie, ya na nsogbu ka ụdị udo na-abịa."',
      pcm: '"For real, with wahala, ease go come."',
    },
    source: {
      en: '— Surah Ash-Sharh 94:6',
      ar: '— سورة الشرح ٩٤:٦',
      yo: '— Surah Ash-Sharh 94:6',
      ha: '— Surah Ash-Sharh 94:6',
      ig: '— Surah Ash-Sharh 94:6',
      pcm: '— Surah Ash-Sharh 94:6',
    },
  },
  {
    type: 'hadith',
    text: {
      en: '"He who does not thank people, does not thank Allah."',
      ar: '"من لا يشكر الناس لا يشكر الله."',
      yo: '"Ẹni tí kò dúpẹ́ lọ́wọ́ ènìyàn, kò dúpẹ́ lọ́wọ́ Allāh."',
      ha: '"Wanda bai gode wa mutane ba, bai gode wa Allah ba."',
      ig: '"Onye na-ekeleghị mmadụ, anaghị ekele Chineke."',
      pcm: '"Person wey no thank people, no thank Allah."',
    },
    source: {
      en: '— Sunan At-Tirmidhi',
      ar: '— سنن الترمذي',
      yo: '— Sunan At-Tirmidhi',
      ha: '— Sunan At-Tirmidhi',
      ig: '— Sunan At-Tirmidhi',
      pcm: '— Sunan At-Tirmidhi',
    },
  },
];

export default function DailyReminder() {
  const { language } = useLanguage();

  const todayReminder = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    return reminders[dayOfYear % reminders.length];
  }, []);

  const label = todayReminder.type === 'hadith'
    ? (language === 'ar' ? 'حديث اليوم' : 'Hadith of the Day')
    : (language === 'ar' ? 'آية اليوم' : 'Verse of the Day');

  return (
    <div className="mx-4 mt-3 p-4 rounded-2xl bg-primary/5 border border-primary/15 islamic-pattern">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
          <BookOpen className="h-3.5 w-3.5 text-primary" />
        </div>
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-medium leading-relaxed text-foreground">
        {todayReminder.text[language] || todayReminder.text.en}
      </p>
      <p className="text-xs text-muted-foreground mt-2">
        {todayReminder.source[language] || todayReminder.source.en}
      </p>
    </div>
  );
}
