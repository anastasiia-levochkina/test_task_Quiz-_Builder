'use client';

import styles from './QuestionBuilder.module.css';
import { Question, QuestionType } from '@/types/quiz';

interface QuestionBuilderProps {
  question: Question;
  index: number;
  onChange: (index: number, updatedQuestion: Question) => void;
  onRemove: (index: number) => void;
}

export default function QuestionBuilder({
  question,
  index,
  onChange,
  onRemove,
}: QuestionBuilderProps) {
  const handleTypeChange = (type: QuestionType) => {
    if (type === 'boolean') {
      onChange(index, {
        title: question.title,
        type,
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false },
        ],
      });

      return;
    }

    if (type === 'input') {
      onChange(index, {
        title: question.title,
        type,
        textAnswer: '',
      });

      return;
    }

    onChange(index, {
      title: question.title,
      type,
      options: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ],
    });
  };

  const handleQuestionTitleChange = (value: string) => {
    onChange(index, {
      ...question,
      title: value,
    });
  };

  const handleTextAnswerChange = (value: string) => {
    onChange(index, {
      ...question,
      textAnswer: value,
    });
  };

  const handleOptionTextChange = (optionIndex: number, value: string) => {
    const updatedOptions = question.options?.map((option, currentIndex) =>
      currentIndex === optionIndex ? { ...option, text: value } : option,
    );

    onChange(index, {
      ...question,
      options: updatedOptions,
    });
  };

  const handleOptionCorrectChange = (optionIndex: number, checked: boolean) => {
    if (question.type === 'boolean') {
      const updatedOptions = question.options?.map((option, currentIndex) => ({
        ...option,
        isCorrect: currentIndex === optionIndex ? checked : false,
      }));

      onChange(index, {
        ...question,
        options: updatedOptions,
      });

      return;
    }

    const updatedOptions = question.options?.map((option, currentIndex) =>
      currentIndex === optionIndex ? { ...option, isCorrect: checked } : option,
    );

    onChange(index, {
      ...question,
      options: updatedOptions,
    });
  };

  const addOption = () => {
    onChange(index, {
      ...question,
      options: [...(question.options || []), { text: '', isCorrect: false }],
    });
  };

  const removeOption = (optionIndex: number) => {
    if (!question.options || question.options.length <= 2) {
      return;
    }

    const updatedOptions = question.options.filter((_, currentIndex) => currentIndex !== optionIndex);

    onChange(index, {
      ...question,
      options: updatedOptions,
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.subtitle}>Question {index + 1}</h3>

        <button type="button" className={styles.removeButton} onClick={() => onRemove(index)}>
          Remove
        </button>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Question title</label>
        <input
          type="text"
          value={question.title}
          onChange={(event) => handleQuestionTitleChange(event.target.value)}
          className={styles.input}
          placeholder="Enter question title"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Question type</label>
        <select
          value={question.type}
          onChange={(event) => handleTypeChange(event.target.value as QuestionType)}
          className={styles.select}
        >
          <option value="boolean">Boolean</option>
          <option value="input">Input</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </div>

      {question.type === 'input' && (
        <div className={styles.field}>
          <label className={styles.label}>Correct answer</label>
          <input
            type="text"
            value={question.textAnswer || ''}
            onChange={(event) => handleTextAnswerChange(event.target.value)}
            className={styles.input}
            placeholder="Enter correct answer"
          />
        </div>
      )}

      {(question.type === 'boolean' || question.type === 'checkbox') && (
        <div className={styles.optionsBlock}>
          <p className={styles.label}>Options</p>

          {question.options?.map((option, optionIndex) => (
            <div key={optionIndex} className={styles.optionRow}>
              <input
                type="text"
                value={option.text}
                onChange={(event) => handleOptionTextChange(optionIndex, event.target.value)}
                className={styles.input}
                placeholder={`Option ${optionIndex + 1}`}
                disabled={question.type === 'boolean'}
              />

              {question.type === 'boolean' ? (
                <input
                  type="radio"
                  name={`boolean-correct-${index}`}
                  checked={option.isCorrect}
                  onChange={(event) => handleOptionCorrectChange(optionIndex, event.target.checked)}
                />
              ) : (
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(event) => handleOptionCorrectChange(optionIndex, event.target.checked)}
                />
              )}

              {question.type === 'checkbox' && question.options && question.options.length > 2 && (
                <button
                  type="button"
                  className={styles.smallRemoveButton}
                  onClick={() => removeOption(optionIndex)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {question.type === 'checkbox' && (
            <button type="button" className={styles.addOptionButton} onClick={addOption}>
              Add option
            </button>
          )}
        </div>
      )}
    </div>
  );
}
