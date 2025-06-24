'use client';

import Header from '@/components/Header';
import Editor from '@/components/Editor';
import useDiary from '@/hooks/useDiary';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { deleteDiary, updateDiary } from '@/actions/diary-actions';
import { queryClient } from '@/config/ReactQueryClientProvider';
import { Button } from '@mui/material';

// input 타입 선언
type DiaryInput = {
  emotion_id: number;
  content: string;
  created_at: string;
};

export default function Edit({ id }) {
  const router = useRouter();

  const updateDiaryMutation = useMutation<void, unknown, DiaryInput>({
    mutationFn: (input) =>
      updateDiary({
        id: id,
        emotion_id: input?.emotion_id,
        content: input?.content,
        created_at: input?.created_at,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['diaries'],
      });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: () => deleteDiary(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['diaries'],
      });
    },
  });

  const curDiaryItem = useDiary(id);

  const onClickDelete = () => {
    if (
      window.confirm('일기를 정말 삭제할까요? 다시 복구되지 않아요!')
    ) {
      // 일기를 삭제하는 로직
      deleteTodoMutation.mutate();
      router.replace('/');
    }
  };

  const onSubmit = (input) => {
    if (window.confirm('일기를 정말 수정할까요?')) {
      updateDiaryMutation.mutate(input);
    }
    router.replace('/');
  };

  return (
    <div>
      <Header
        title={'일기 수정하기'}
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
            className="!shadow-none !bg-red-400 hover:!bg-red-500 !text-white !font-[NanumPenScript] !text-lg"
            variant="contained"
            onClick={onClickDelete}
          >
            삭제하기
          </Button>
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
}
