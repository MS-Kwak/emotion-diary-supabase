import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function HomeSkeleton() {
  return (
    <>
      <div className="flex items-center py-3 gap-2">
        <Skeleton variant="rounded" width={66} height={36} />
        <Skeleton
          className="!flex-1"
          variant="rounded"
          width={100}
          height={36}
        />
      </div>
      <div className="flex gap-3 justify-between py-4 border-b-1 border-gray-200">
        <Skeleton variant="rounded" width={120} height={80} />
        <div className="flex flex-col gap-1 flex-1">
          <Skeleton variant="rectangular" width={120} height={20} />
          <Skeleton variant="rectangular" width={200} height={20} />
        </div>
        <Skeleton variant="rounded" width={66} height={36} />
      </div>
      <div className="flex gap-3 justify-between py-4 border-b-1 border-gray-200">
        <Skeleton variant="rounded" width={120} height={80} />
        <div className="flex flex-col gap-1 flex-1">
          <Skeleton variant="rectangular" width={120} height={20} />
          <Skeleton variant="rectangular" width={200} height={20} />
        </div>
        <Skeleton variant="rounded" width={66} height={36} />
      </div>
      <div className="flex gap-3 justify-between py-4 border-b-1 border-gray-200">
        <Skeleton variant="rounded" width={120} height={80} />
        <div className="flex flex-col gap-1 flex-1">
          <Skeleton variant="rectangular" width={120} height={20} />
          <Skeleton variant="rectangular" width={200} height={20} />
        </div>
        <Skeleton variant="rounded" width={66} height={36} />
      </div>
    </>
  );
}
