import { getDiaries } from '@/actions/diary-actions';
import { useQuery } from '@tanstack/react-query';

export default function useDiary(id) {
  const { data: diaries } = useQuery({
    queryKey: ['diaries'],
    queryFn: () => getDiaries(),
  });

  // 데이터가 아직 없거나 로딩 중이면 null 등 반환
  if (!diaries) return null;

  const diary = diaries.find(
    (item) => String(item.id) === String(id)
  );
  // if (!diary) {
  //   alert('존재하지 않는 일기입니다');
  //   // 필요시 이동
  // }
  return diary;
}
