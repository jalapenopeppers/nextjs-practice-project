'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  }

  const checkTextKeys = ['title', 'summary', 'instructions', 'creator', 'creator_email'];
  if (
    !checkTextKeys.every((key) => isInvalidText(meal[key])) || 
    !meal.creator_email.includes('@') ||
    !meal.image || 
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input.'
    };
  }

  await saveMeal(meal);
  redirect('/meals');
}