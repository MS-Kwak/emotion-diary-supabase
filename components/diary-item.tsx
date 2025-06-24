import { getEmotionImage } from '@/utils/get-emotion-image';
import { useRouter } from 'next/navigation';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';

export default function DiaryItem({
  id,
  created_at,
  emotion_id,
  content,
}) {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-3 justify-between py-4 border-b-1 border-gray-200">
      <div
        onClick={() => router.push(`/diary/${id}`)}
        className={`img_section img_section_${emotion_id} min-w-30 h-20 flex justify-center cursor-pointer rounded-sm`}
      >
        <Image
          className=""
          src={getEmotionImage(emotion_id)}
          width={130}
          height={100}
          alt="emotion image"
        />
      </div>
      <div
        onClick={() => router.push(`/diary/${id}`)}
        className="flex-1 flex flex-col text-left cursor-pointer"
      >
        <div className="text-2xl">
          {new Date(created_at).toLocaleDateString()}
        </div>
        <div className="text-lg">{content}</div>
      </div>
      <div className="button_section">
        <Button
          onClick={() => router.push(`/edit/${id}`)}
          className="!shadow-none !bg-slate-200 hover:!bg-slate-300 !text-black !text-lg py-1 px-3 rounded-sm"
        >
          수정하기
        </Button>
      </div>
    </div>
  );
}
