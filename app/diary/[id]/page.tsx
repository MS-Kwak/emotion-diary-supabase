import Diary from '@/components/diary';

export default async function EditPage({ params }) {
  const { id } = await params;

  return <Diary id={id} />;
}
