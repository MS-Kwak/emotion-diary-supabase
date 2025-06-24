'use client';

import EmotionItem from './emotion-item';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { emotionList } from '@/utils/constants';
import { getStringedDate } from '@/utils/get-stringed-date';
import { useRouter } from 'next/navigation';

export default function Editor({ initData, onSubmit }) {
  const router = useRouter();
  const [input, setInput] = useState({
    created_at: new Date(),
    emotion_id: 3,
    content: '',
  });

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        created_at: new Date(initData.created_at),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    // console.log(e.target.name); // 어떤 요소에 입력이 들어온건지
    // console.log(e.target.value); // 입력된 값이 무엇인지?

    let name = e.target.name;
    let value = e.target.value;

    if (name === 'created_at') {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="mb-4">
        <h4 className="text-xl font-bold text-left py-5">
          오늘의 날짜
        </h4>
        <input
          type="date"
          className="bg-gray-200 border-1 rounded-sm px-2 py-1 border-none text-xl"
          value={getStringedDate(input.created_at)}
          name="created_at"
          onChange={onChangeInput}
        />
      </section>
      <section className="mb-4">
        <h4 className="text-xl font-bold text-left py-5">
          오늘의 감정
        </h4>
        <div className="flex justify-around gap-1">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: 'emotion_id',
                    value: item.emotion_id,
                  },
                })
              }
              key={item.emotion_id}
              {...item}
              isSelected={item.emotion_id === input.emotion_id}
            />
          ))}
        </div>
      </section>
      <section className="mb-4">
        <h4 className="text-xl font-bold text-left py-5">
          오늘의 일기
        </h4>
        <textarea
          className="bg-gray-200 w-full p-4 rounded-sm resize-none text-xl h-50"
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="flex justify-between">
        <Button
          className="!shadow-none !bg-slate-200 hover:!bg-slate-300 !text-black !text-lg !font-[NanumPenScript]"
          onClick={() => router.back()}
        >
          취소하기
        </Button>
        <Button
          className="!shadow-none !bg-green-400 hover:!bg-green-500 !text-white !text-lg !font-[NanumPenScript]"
          onClick={onClickSubmitButton}
        >
          작성완료
        </Button>
      </section>
    </div>
  );
}
