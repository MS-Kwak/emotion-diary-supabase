import Edit from '@/components/edit';

export default async function EditPage({ params }) {
  const { id } = await params;
  return <Edit id={id} />;
}
