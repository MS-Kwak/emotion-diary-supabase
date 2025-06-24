'use server';

import { Database } from 'types_db';
import { createServerSupabaseClient } from 'utils/supabase/server';

export type DiaryRow = Database['public']['Tables']['diary']['Row'];
export type DiaryRowInsert =
  Database['public']['Tables']['diary']['Insert'];
export type DiaryRowUpdate =
  Database['public']['Tables']['diary']['Update'];

function handleError(error: any) {
  console.error('Error:', error);
  throw new Error(error.message || 'An error occurred');
}

export async function getDiaries(): Promise<DiaryRow[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('diary')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    handleError(error);
  }
  return data;
}

export async function createDiary(diary: DiaryRowInsert) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('diary')
    .insert({ ...diary });

  if (error) {
    handleError(error);
  }
  return data;
}

export async function updateDiary(diary: DiaryRowUpdate) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('diary')
    .update({ ...diary })
    .eq('id', diary.id);

  if (error) {
    handleError(error);
  }
  return data;
}

export async function deleteDiary(id: number) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('diary')
    .delete()
    .eq('id', id);

  if (error) {
    handleError(error);
  }
  return data;
}
