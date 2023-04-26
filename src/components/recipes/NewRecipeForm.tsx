import { useFieldArray, useForm } from 'react-hook-form';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import styles from 'src/styles/recipes/NewRecipeForm.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Title } from '../ui/Title';
import { FiTrash2 } from 'react-icons/fi';
import { BsPlus } from 'react-icons/bs';
import { AiOutlineMinus } from 'react-icons/ai';

interface NewRecipeFormInputs {
  name: string;
  description: string;
  tags: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    dessert: boolean;
    snack: boolean;
  };
  cookTime: number;
  difficulty: string;
  rations: number;
  image: File;
  ingredients: {
    name: string;
    quantity: number | undefined;
    unit: string;
  }[];
  instructions: {
    step: string;
  }[];
}

export const NewRecipeForm: React.FC = () => {
  const {
    control,
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<NewRecipeFormInputs>({
    defaultValues: {
      ingredients: [{ name: '', quantity: undefined, unit: '' }],
      instructions: [{ step: '' }],
    },
  });
  const {
    fields: ingredients,
    remove: ingRemove,
    append: ingAppend,
  } = useFieldArray({
    control,
    name: 'ingredients',
  });
  const {
    fields: instructions,
    remove: insRemove,
    append: insAppend,
  } = useFieldArray({
    control,
    name: 'instructions',
  });
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    } else {
      setImageUrl(null);
    }
  }, [image]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const postHandler = (data: NewRecipeFormInputs) => {
    console.log(data);
  };

  return (
    <Card style={styles.form__card} testid='form-card'>
      <div className={styles.form__container}>
        <form
          autoComplete='off'
          className={styles.form}
          onSubmit={handleSubmit(postHandler)}
          data-testid='new-recipe-form'
        >
          <div className={styles.header}>
            <Title style={styles.title}>Nueva receta</Title>
            <Button style={styles.post__button} testid='post-button' submit>
              Publicar
            </Button>
          </div>
          <div className={styles.top__form__section}>
            <div className={styles.left__subsection}>
              <div className={styles.field} data-testid='form-field'>
                <p>Nombre de la receta</p>
                <input
                  placeholder='Pizza de jamón y queso'
                  className={styles.input__style}
                  type='text'
                  data-testid='name-input'
                  {...register('name', {
                    required: true,
                    maxLength: 50,
                  })}
                />
                {errors.name?.type === 'required' && (
                  <div className={styles.errors}>
                    <p className={styles.error__msg} data-testid='alert'>
                      Es necesario que introduzcas un nombre para la receta
                    </p>
                  </div>
                )}
                {errors.name?.type === 'maxLength' && (
                  <div className={styles.errors}>
                    <p className={styles.error__msg} data-testid='alert'>
                      El nombre de la receta debe tener como máximo 50
                      caracteres
                    </p>
                  </div>
                )}
              </div>
              <div className={styles.field} data-testid='form-field'>
                <p>Descripción</p>
                <input
                  placeholder='Una pizza de jamón y queso muy rica'
                  className={styles.input__style}
                  type='text'
                  data-testid='description-input'
                  {...register('description', {
                    required: true,
                    maxLength: 200,
                  })}
                />
                {errors.description?.type === 'required' && (
                  <div className={styles.errors}>
                    <p className={styles.error__msg} data-testid='alert'>
                      Es necesario que introduzcas una descripción
                    </p>
                  </div>
                )}
                {errors.description?.type === 'maxLength' && (
                  <div className={styles.errors}>
                    <p className={styles.error__msg} data-testid='alert'>
                      La descripción debe tener como máximo 200 caracteres
                    </p>
                  </div>
                )}
              </div>
              <div className={styles.field} data-testid='form-field'>
                <p>Etiquetas</p>
                <div className={styles.tags__container}>
                  <label
                    className={
                      watch('tags.breakfast')
                        ? styles.tag__checked
                        : styles.tag__not__checked
                    }
                  >
                    <input
                      value='Desayuno'
                      className={styles.tag__checkbox}
                      type='checkbox'
                      data-testid='breakfast-input'
                      {...register('tags.breakfast')}
                    />
                    Desayuno
                  </label>
                  <label
                    className={
                      watch('tags.lunch')
                        ? styles.tag__checked
                        : styles.tag__not__checked
                    }
                  >
                    <input
                      value='Almuerzo'
                      className={styles.tag__checkbox}
                      type='checkbox'
                      data-testid='lunch-input'
                      {...register('tags.lunch')}
                    />
                    Almuerzo
                  </label>
                  <label
                    className={
                      watch('tags.dinner')
                        ? styles.tag__checked
                        : styles.tag__not__checked
                    }
                  >
                    <input
                      value='Cena'
                      className={styles.tag__checkbox}
                      type='checkbox'
                      data-testid='dinner-input'
                      {...register('tags.dinner')}
                    />
                    Cena
                  </label>
                  <label
                    className={
                      watch('tags.dessert')
                        ? styles.tag__checked
                        : styles.tag__not__checked
                    }
                  >
                    <input
                      value='Postre'
                      className={styles.tag__checkbox}
                      type='checkbox'
                      data-testid='dessert-input'
                      {...register('tags.dessert')}
                    />
                    Postre
                  </label>
                  <label
                    className={
                      watch('tags.snack')
                        ? styles.tag__checked
                        : styles.tag__not__checked
                    }
                  >
                    <input
                      value='Picoteo'
                      className={styles.tag__checkbox}
                      type='checkbox'
                      data-testid='snack-input'
                      {...register('tags.snack')}
                    />
                    Picoteo
                  </label>
                </div>
              </div>
              <div className={styles.stats}>
                <div className={styles.field} data-testid='form-field'>
                  <p>Tiempo (min)</p>
                  <input
                    placeholder='15'
                    className={styles.input__style}
                    type='number'
                    data-testid='input__style'
                    {...register('cookTime', {
                      required: true,
                      min: 1,
                    })}
                  />
                  {errors.cookTime?.type === 'required' && (
                    <div className={styles.errors}>
                      <p className={styles.error__msg} data-testid='alert'>
                        Es necesario que introduzcas un tiempo de preparación
                      </p>
                    </div>
                  )}
                  {errors.cookTime?.type === 'min' && (
                    <div className={styles.errors}>
                      <p className={styles.error__msg} data-testid='alert'>
                        El tiempo de preparación debe ser mayor que 0
                      </p>
                    </div>
                  )}
                </div>
                <div className={styles.field} data-testid='form-field'>
                  <p>Dificultad</p>
                  <select
                    className={styles.input__style}
                    data-testid='difficulty-input'
                    {...register('difficulty', {
                      required: true,
                    })}
                  >
                    <option value='Fácil'>Fácil</option>
                    <option value='Media'>Media</option>
                    <option value='Difícil'>Difícil</option>
                  </select>
                  {errors.difficulty?.type === 'required' && (
                    <div className={styles.errors}>
                      <p className={styles.error__msg} data-testid='alert'>
                        Debes seleccionar una dificultad
                      </p>
                    </div>
                  )}
                </div>
                <div className={styles.field} data-testid='form-field'>
                  <p>Raciones</p>
                  <input
                    placeholder='2'
                    className={styles.input__style}
                    type='text'
                    data-testid='rations-input'
                    {...register('rations', {
                      required: true,
                      min: 1,
                    })}
                  />
                  {errors.rations?.type === 'required' && (
                    <div className={styles.errors}>
                      <p className={styles.error__msg} data-testid='alert'>
                        Debes indicar el número de raciones
                      </p>
                    </div>
                  )}
                  {errors.rations?.type === 'min' && (
                    <div className={styles.errors}>
                      <p className={styles.error__msg} data-testid='alert'>
                        El número de raciones debe ser mayor que 0
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.right__subsection}>
              <div className={styles.field} data-testid='form-field'>
                <p>Foto de tu plato</p>
                {!imageUrl ? (
                  <>
                    <label className={styles.image__input__button}>
                      <input
                        className={styles.image__input}
                        type='file'
                        accept='image/*'
                        data-testid='image-input'
                        {...register('image', {
                          required: true,
                        })}
                        onChange={onImageChange}
                      />
                    </label>
                    {errors.image?.type === 'required' && (
                      <div className={styles.errors}>
                        <p className={styles.error__msg} data-testid='alert'>
                          Debes subir una imagen para la receta
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className={styles.image__container}>
                    <Image
                      src={imageUrl}
                      alt='Imagen de la receta'
                      style={{ objectFit: 'cover' }}
                      fill
                      priority
                    />
                    <Button
                      style={styles.remove__image__button}
                      onClick={() => setImage(null)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <FiTrash2 />
                      </div>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.bottom__form__section}>
            <div className={styles.left__subsection}>
              <div className={styles.field} data-testid='form-field'>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <p>Ingredientes</p>
                  <Button
                    style={styles.add__button}
                    onClick={() =>
                      ingAppend({ name: '', quantity: undefined, unit: '' })
                    }
                  >
                    <BsPlus size={30} />
                  </Button>
                </div>
                {ingredients.map((ingredient, index) => (
                  <div
                    className={styles.ingredients__array}
                    key={ingredient.id}
                  >
                    <div className={styles.field} data-testid='form-field'>
                      <input
                        placeholder='Harina'
                        className={styles.input__style}
                        type='text'
                        data-testid='ingredient-input'
                        {...register(`ingredients.${index}.name`, {
                          required: true,
                          maxLength: 50,
                        })}
                      />
                      {errors?.ingredients?.[index]?.name?.type ===
                        'required' && (
                        <div className={styles.errors}>
                          <p className={styles.error__msg} data-testid='alert'>
                            Debes introducir el nombre del ingrediente
                          </p>
                        </div>
                      )}
                      {errors?.ingredients?.[index]?.name?.type ===
                        'maxLength' && (
                        <div className={styles.errors}>
                          <p className={styles.error__msg} data-testid='alert'>
                            El nombre del ingrediente no puede superar los 50
                            caracteres
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={styles.field} data-testid='form-field'>
                      <input
                        placeholder='200'
                        className={styles.input__style}
                        type='number'
                        data-testid='quantity-input'
                        {...register(`ingredients.${index}.quantity`, {
                          required: true,
                          min: 1,
                        })}
                      />
                      {errors?.ingredients?.[index]?.quantity?.type ===
                        'required' && (
                        <div className={styles.errors}>
                          <p className={styles.error__msg} data-testid='alert'>
                            Debes introducir la cantidad del ingrediente
                          </p>
                        </div>
                      )}
                      {errors?.ingredients?.[index]?.quantity?.type ===
                        'min' && (
                        <div className={styles.errors}>
                          <p className={styles.error__msg} data-testid='alert'>
                            La cantidad del ingrediente debe ser mayor que 0
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={styles.field} data-testid='form-field'>
                      <input
                        placeholder='gramos'
                        className={styles.input__style}
                        type='text'
                        data-testid='unit-input'
                        {...register(`ingredients.${index}.unit`, {
                          required: true,
                          maxLength: 20,
                        })}
                      />
                      {errors?.ingredients?.[index]?.unit?.type ===
                        'required' && (
                        <div className={styles.errors}>
                          <p className={styles.error__msg} data-testid='alert'>
                            Debes introducir la unidad del ingrediente
                          </p>
                        </div>
                      )}
                      {errors?.ingredients?.[index]?.unit?.type ===
                        'maxLength' && (
                        <div className={styles.errors}>
                          <p className={styles.error__msg} data-testid='alert'>
                            La unidad del ingrediente no puede superar los 20
                            caracteres
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      {ingredients.length > 1 && (
                        <Button
                          style={styles.remove__button}
                          onClick={() => ingRemove(index)}
                        >
                          <AiOutlineMinus size={15} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.right__subsection}>
              <div className={styles.field} data-testid='form-field'>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <p>Pasos</p>
                  <Button
                    style={styles.add__button}
                    onClick={() => insAppend({ step: '' })}
                  >
                    <BsPlus size={30} />
                  </Button>
                </div>
                {instructions.map((instruction, index) => (
                  <div
                    className={styles.instructions__array}
                    key={instruction.id}
                  >
                    <input
                      placeholder='Precalentar el horno a 180ºC'
                      className={styles.input__style}
                      type='text'
                      data-testid='instruction-input'
                      {...register(`instructions.${index}.step`, {
                        required: true,
                        maxLength: 200,
                      })}
                    />
                    {errors?.instructions?.[index]?.step?.type ===
                      'required' && (
                      <div className={styles.errors}>
                        <p className={styles.error__msg} data-testid='alert'>
                          Debes introducir el paso de la receta
                        </p>
                      </div>
                    )}
                    {errors?.instructions?.[index]?.step?.type ===
                      'maxLength' && (
                      <div className={styles.errors}>
                        <p className={styles.error__msg} data-testid='alert'>
                          El paso de la receta no puede superar los 200
                          caracteres
                        </p>
                      </div>
                    )}
                    <div>
                      {instructions.length > 1 && (
                        <Button
                          style={styles.remove__button}
                          onClick={() => insRemove(index)}
                        >
                          <AiOutlineMinus size={15} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};
