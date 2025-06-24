'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { Button } from '@mui/material';
import useDiary from '@/hooks/useDiary';
import { getStringedDate } from '@/utils/get-stringed-date';
import { emotionList } from '@/utils/constants';
import { getEmotionImage } from '@/utils/get-emotion-image';

export default function Diary({ id }) {
  const router = useRouter();

  const curDiaryItem = useDiary(id);

  if (!curDiaryItem) {
    return <div>데이터 로딩중...</div>;
  }

  const { created_at, emotion_id, content } = curDiaryItem;
  const title = getStringedDate(new Date(created_at));

  const EmotionItem = emotionList.find(
    (item) => item.emotion_id === emotion_id
  );

  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={
          <Button
            className="!shadow-none !bg-slate-200 hover:!bg-slate-300 !text-black !font-[NanumPenScript] !text-lg"
            variant="contained"
            onClick={() => router.back()}
          >
            <i className="fa-solid fa-chevron-left mr-2 text-sm"></i>
            뒤로가기
          </Button>
        }
        rightChild={
          <Button
            className="!shadow-none !bg-slate-200 hover:!bg-slate-300 !text-black !font-[NanumPenScript] !text-lg"
            variant="contained"
            onClick={() => router.push(`/edit/${id}`)}
          >
            수정하기
          </Button>
        }
      />
      <section className="w-full mb-8 flex flex-col items-center">
        <h4 className="text-xl font-bold py-8">오늘의 감정</h4>
        <div
          className={`w-60 h-60 rounded-sm flex flex-col items-center justify-around text-white text-xl emotion_img_wrapper_${emotion_id}`}
        >
          <img src={getEmotionImage(emotion_id)} />
          <div>{EmotionItem.emotionName}</div>
        </div>
      </section>
      <section className="w-full mb-5 flex flex-col items-center">
        <h4 className="text-xl font-bold py-8">오늘의 일기</h4>
        <div className="w-full bg-slate-200 rounded-sm">
          <pre className="break-keep p-6 text-xl">{content}</pre>
        </div>
      </section>
    </div>
  );
}
