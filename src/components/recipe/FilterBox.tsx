import { Title } from '../ui/Title';
import styles from '../../styles/recipe/FilterBox.module.css';
import { Slider } from '@mui/material';
import { useState } from 'react';
import { FilterBoxFormInputs } from 'recipe-types';
import { Button } from '../ui/Button';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { encode } from 'querystring';

interface FilterBoxProps {
  recipes: {
    minRating: number;
    maxRating: number;
    minTime: number;
    maxTime: number;
    tags: {
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
      dessert: boolean;
      snack: boolean;
      drink: boolean;
    };
    difficulties: {
      easy: boolean;
      medium: boolean;
      hard: boolean;
    };
  };
  title?: boolean;
}

export const FilterBox: React.FC<FilterBoxProps> = ({ recipes, title }) => {
  const router = useRouter();

  const [rating, setRating] = useState<number[]>(
    typeof router.query.averageRating === 'string'
      ? [
          Number(router.query.averageRating.split('-')[0]),
          Number(router.query.averageRating.split('-')[1]),
        ]
      : [recipes.minRating, recipes.maxRating]
  );

  const [time, setTime] = useState<number[]>(
    typeof router.query.cookTime === 'string'
      ? [
          Number(router.query.cookTime.split('-')[0]),
          Number(router.query.cookTime.split('-')[1]),
        ]
      : [recipes.minTime, recipes.maxTime]
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
    if (rating[0] !== recipes.minRating || rating[1] !== recipes.maxRating) {
      filters.push(`averageRating=${rating[0]}-${rating[1]}`);
    }
    if (time[0] !== recipes.minTime || time[1] !== recipes.maxTime) {
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
      {title && <Title sm>Filtros</Title>}
      <div className={styles.sections}>
        <div className={styles.section}>
          <p className={styles.section__title}>Puntuación</p>
          <div className={styles.slider__container}>
            <Slider
              value={rating}
              size='small'
              min={recipes.minRating}
              max={recipes.maxRating}
              step={0.5}
              style={{ color: '#f44336', width: '90%' }}
              onChange={ratingHandler}
              marks={[
                { value: rating[0], label: rating[0] },
                { value: rating[1], label: rating[1] },
              ]}
              classes={{ markLabel: styles.slider__label }}
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
              min={recipes.minTime}
              max={recipes.maxTime}
              style={{
                color: '#f44336',
                width: '90%',
              }}
              onChange={timeHandler}
              marks={[
                { value: time[0], label: time[0] },
                { value: time[1], label: time[1] },
              ]}
              classes={{ markLabel: styles.slider__label }}
            />
          </div>
        </div>
        <hr />
        <div className={styles.section}>
          <p className={styles.section__title}>Dificultad</p>
          <div className={styles.checkboxes}>
            {recipes.difficulties.easy && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Fácil')}
                  {...register('difficulty.easy')}
                />
                <label>Fácil</label>
              </div>
            )}
            {recipes.difficulties.medium && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Media')}
                  {...register('difficulty.medium')}
                />
                <label>Media</label>
              </div>
            )}
            {recipes.difficulties.hard && (
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
        <hr />
        <div className={styles.section}>
          <p className={styles.section__title}>Etiquetas</p>
          <div className={styles.checkboxes}>
            {recipes.tags.breakfast && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Desayuno')}
                  {...register('tags.breakfast')}
                />
                <label>Desayuno</label>
              </div>
            )}
            {recipes.tags.lunch && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Almuerzo')}
                  {...register('tags.lunch')}
                />
                <label>Almuerzo</label>
              </div>
            )}
            {recipes.tags.dinner && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Cena')}
                  {...register('tags.dinner')}
                />
                <label>Cena</label>
              </div>
            )}
            {recipes.tags.dessert && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Postre')}
                  {...register('tags.dessert')}
                />
                <label>Postre</label>
              </div>
            )}
            {recipes.tags.snack && (
              <div className={styles.checkbox}>
                <input
                  type='checkbox'
                  defaultChecked={router.query.tags?.includes('Picoteo')}
                  {...register('tags.snack')}
                />
                <label>Picoteo</label>
              </div>
            )}
            {recipes.tags.drink && (
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
