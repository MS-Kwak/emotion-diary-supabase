import { getEmotionImage } from '@/utils/get-emotion-image';
import Image from 'next/image';

export default function EmotionItem({
  emotion_id,
  emotionName,
  isSelected,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`py-2 px-6 rounded-sm flex flex-col items-center cursor-pointer bg-slate-200 ${
        isSelected ? `EmotionItem_on_${emotion_id}` : ''
      }`}
    >
      <Image
        width={50}
        height={50}
        className="mb-2 w-1/2"
        src={getEmotionImage(emotion_id)}
        alt="emotion image"
      />
      <div className="whitespace-nowrap">{emotionName}</div>
    </div>
  );
}
