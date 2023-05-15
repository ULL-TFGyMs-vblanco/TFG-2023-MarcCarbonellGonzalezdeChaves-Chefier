import { Title } from '../ui/Title';
import styles from '../../styles/recipe/FilterBox.module.css';
import { Slider } from '@mui/material';
import { useState } from 'react';
import { FilterBoxFormInputs, Recipe } from 'recipe-types';
import utils from '../../utils/RecipeUtils';
import { Button } from '../ui/Button';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { encode } from 'querystring';

interface FilterBoxProps {
  recipes: Recipe[];
}

export const FilterBox: React.FC<FilterBoxProps> = ({ recipes }) => {
  const [minRating, maxRating] = utils.getMinAndMaxRating(recipes);
  const [minTime, maxTime] = utils.getMinAndMaxTime(recipes);
  const difficulties = utils.getDifficulties(recipes);
  const tags = utils.getTags(recipes);
  const router = useRouter();

  const [rating, setRating] = useState<number[]>(
    typeof router.query.rating === 'string'
      ? [
          Number(router.query.rating.split('-')[0]),
          Number(router.query.rating.split('-')[1]),
        ]
      : [minRating, maxRating]
  );

  const [time, setTime] = useState<number[]>(
    typeof router.query.cookTime === 'string'
      ? [
          Number(router.query.cookTime.split('-')[0]),
          Number(router.query.cookTime.split('-')[1]),
        ]
      : [minTime, maxTime]
  );
  const { register, handleSubmit } = useForm<FilterBoxFormInputs>();

  const ratingHandler = (event: Event, newValue: number | number[]) => {
    setRating(newValue as number[]);
  };

  const timeHandler = (event: Event, newValue: number | number[]) => {
    setTime(newValue as number[]);
  };

  const submitHandler = (data: FilterBoxFormInputs) => {
    const { tags: tagFilter, difficulty: difficulyFilter } = data;
    const filters: string[] = [];
    if (rating[0] !== minRating || rating[1] !== maxRating) {
      filters.push(`averageRating=${rating[0]}-${rating[1]}`);
    }
    if (time[0] !== minTime || time[1] !== maxTime) {
      filters.push(`cookTime=${time[0]}-${time[1]}`);
    }
    Object.entries(tagFilter).forEach(([key, value]) => {
      if (value) {
        filters.push(`tags=${key}`);
      }
    });
    Object.entries(difficulyFilter).forEach(([key, value]) => {
      if (value) {
        filters.push(`difficulty=${key}`);
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { averageRating, cookTime, tags, difficulty, ...rest } = router.query;
    if (filters.length > 0) {
      if (rest.search || rest.following) {
        router.push(`/${encode(rest)}&${filters.join('&')}`);
      } else {
        router.push(`/${encode(rest)}?${filters.join('&')}`);
      }
    } else {
      router.push(`/${encode(rest)}`);
    }
  };

  return (
    <div className={styles.container}>
      <Title sm>Filtros</Title>
      <div className={styles.sections}>
        <div className={styles.section}>
          <p className={styles.section__title}>Puntuación</p>
          <div className={styles.slider__container}>
            <Slider
              value={rating}
              size='small'
              min={minRating}
              max={maxRating}
              style={{ color: '#f44336', width: '90%' }}
              onChange={ratingHandler}
              marks={[
                { value: rating[0], label: rating[0] },
                { value: rating[1], label: rating[1] },
              ]}
              className={styles.slider}
            />
          </div>
        </div>
        <hr />
        <div className={styles.section}>
          <p className={styles.section__title}>Tiempo</p>
          <div className={styles.slider__container}>
            <Slider
              value={time}
              size='small'
              min={minTime}
              max={maxTime}
              style={{ color: '#f44336', width: '90%' }}
              onChange={timeHandler}
              marks={[
                { value: time[0], label: time[0] },
                { value: time[1], label: time[1] },
              ]}
            />
          </div>
        </div>
        <hr />
        <div className={styles.section}>
          <p className={styles.section__title}>Etiquetas</p>
          <div className={styles.checkboxes}>
            {tags.breakfast && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Desayuno')}
                  {...register('tags.breakfast')}
                />
                <label>Desayuno</label>
              </div>
            )}
            {tags.lunch && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Almuerzo')}
                  {...register('tags.lunch')}
                />
                <label>Almuerzo</label>
              </div>
            )}
            {tags.dinner && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Cena')}
                  {...register('tags.dinner')}
                />
                <label>Cena</label>
              </div>
            )}
            {tags.dessert && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Postre')}
                  {...register('tags.dessert')}
                />
                <label>Postre</label>
              </div>
            )}
            {tags.snack && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Picoteo')}
                  {...register('tags.snack')}
                />
                <label>Picoteo</label>
              </div>
            )}
            {tags.drink && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Bebida')}
                  {...register('tags.drink')}
                />
                <label>Bebida</label>
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className={styles.section}>
          <p className={styles.section__title}>Dificultad</p>
          <div className={styles.checkboxes}>
            {difficulties.easy && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Fácil')}
                  {...register('difficulty.easy')}
                />
                <label>Fácil</label>
              </div>
            )}
            {difficulties.medium && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Media')}
                  {...register('difficulty.medium')}
                />
                <label>Media</label>
              </div>
            )}
            {difficulties.hard && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Difícil')}
                  {...register('difficulty.hard')}
                />
                <label>Difícil</label>
              </div>
            )}
          </div>
        </div>
      </div>
      <Button
        className={styles.apply__btn}
        onClick={handleSubmit(submitHandler)}
      >
        Aplicar
      </Button>
    </div>
  );
};
