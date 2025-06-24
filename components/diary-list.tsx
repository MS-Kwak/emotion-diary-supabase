import DiaryItem from './diary-item';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

export default function DiaryList({ data }) {
  const router = useRouter();
  const [sortType, setSortType] = useState('latest');

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    // sort() 메소드는 원본을 정렬하고, toSorted메소드는 원본 배열은 그대로 냅두고 새로운 배열만 반환해요~
    return data.toSorted((a, b) => {
      if (sortType === 'oldest') {
        return (
          Number(new Date(a.created_at).getTime()) -
          Number(new Date(b.created_at).getTime())
        );
      } else {
        return (
          Number(new Date(b.created_at).getTime()) -
          Number(new Date(a.created_at).getTime())
        );
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div>
      <div className="my-4 flex gap-2">
        <select
          onChange={onChangeSortType}
          className="bg-slate-200 px-2 py-1 rounded-sm text-lg"
        >
          <option value={'latest'}>최신순</option>
          <option value={'oldest'}>오래된 순</option>
        </select>
        <Button
          variant="contained"
          className="flex-1 !shadow-none !bg-green-400 hover:!bg-green-500 !font-[NanumPenScript] !text-lg"
          onClick={() => router.push('/new')}
        >
          새 일기 쓰기
        </Button>
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
