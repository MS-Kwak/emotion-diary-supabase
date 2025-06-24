'use client';

import { getDiaries } from '@/actions/diary-actions';
import DiaryList from '@/components/diary-list';
import Header from '@/components/Header';
import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import HomeSkeleton from '@/components/skeleton/hom-skeleton';

const getMonthlyData = (pivotDate, data) => {
  // 1일 0시 0분 0초 getTime()은 비교를 위해 타임스탬프 형식으로...
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) =>
      beginTime <= new Date(item.created_at).getTime() &&
      new Date(item.created_at).getTime() <= endTime
  );
};

export default function UI() {
  const [pivotDate, setPivotDate] = useState(new Date());
  const [monthlyData, setMonthlyData] = useState([]);
  const diariesQuery = useQuery({
    queryKey: ['diaries'],
    queryFn: () => getDiaries(),
  });

  useEffect(() => {
    if (diariesQuery.data !== undefined) {
      const data = getMonthlyData(pivotDate, diariesQuery.data);
      setMonthlyData(data);
    }
  }, [diariesQuery.data, pivotDate]);

  const onDecreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1)
    );
  };
  const onIecreaseMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)
    );
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${
          pivotDate.getMonth() + 1
        }월`}
        leftChild={
          <Button
            className="!min-w-auto !p-3 !w-10 !shadow-none !bg-slate-200 hover:!bg-slate-300 !text-black"
            variant="contained"
            onClick={onDecreaseMonth}
          >
            <i className="fa-solid fa-chevron-left text-sm"></i>
          </Button>
        }
        rightChild={
          <Button
            className="!min-w-auto !p-3 !w-10 !shadow-none !bg-slate-200 hover:!bg-slate-300 !text-black"
            variant="contained"
            onClick={onIecreaseMonth}
          >
            <i className="fa-solid fa-chevron-right text-sm"></i>
          </Button>
        }
      />
      {diariesQuery.isPending && <HomeSkeleton />}
      {diariesQuery.data && <DiaryList data={monthlyData} />}
    </div>
  );
}
