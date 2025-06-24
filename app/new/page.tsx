'use client';

import Header from '@/components/header';
import { Button } from '@mui/material';
import Editor from '@/components/editor';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { createDiary } from '@/actions/diary-actions';
import { queryClient } from '@/config/ReactQueryClientProvider';

// input 타입 선언
type DiaryInput = {
  emotion_id: number;
  content: string;
  created_at: string;
};

export default function NewPage() {
  const router = useRouter();

  // mutation을 컴포넌트 최상단에 선언
  const createDiaryMutation = useMutation<void, unknown, DiaryInput>({
    mutationFn: (input) =>
      createDiary({
        emotion_id: input?.emotion_id,
        content: input?.content,
        created_at: input?.created_at,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diaries'] });
      router.replace('/'); // 성공 후 홈으로 이동
    },
  });

  // 자식한테 콜백 전달
  const onSubmit = (input) => {
    createDiaryMutation.mutate(input);
    console.log('일기 작성 요청:', input);
  };

  return (
    <div>
      <Header
        title={'새 일기 쓰기'}
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
        rightChild={''}
      />
      <Editor initData={''} onSubmit={onSubmit} />
    </div>
  );
}
