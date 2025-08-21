import '../../setupTests';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../TodoList';

describe('TodoList', () => {
  it('renders initial tasks', () => {
    render(<TodoList />);

    expect(screen.getByText('할일 1')).toBeInTheDocument();
    expect(screen.getByText('할일 2')).toBeInTheDocument();
    expect(screen.getByText('완료한일 1')).toBeInTheDocument();
  });

  it('adds a task when typing and pressing Enter', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('내용을 입력후 엔터');
    fireEvent.change(input, { target: { value: '새 할일' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(screen.getByText('새 할일')).toBeInTheDocument();
  });

  it('toggles task completion when checkbox is clicked', () => {
    render(<TodoList />);
    const taskText = screen.getByText('할일 1');
    const checkbox = taskText.previousSibling as HTMLElement;

    expect(taskText).not.toHaveClass('completedText');
    fireEvent.click(checkbox);
    expect(taskText).toHaveClass('completedText');
  });

  it('removes a task when delete button is clicked', () => {
    render(<TodoList />);
    const itemContainer = screen.getByText('할일 1').closest('.itemContainer')!;
    const deleteButton = itemContainer.querySelector('button')!;

    fireEvent.click(deleteButton);
    expect(screen.queryByText('할일 1')).not.toBeInTheDocument();
  });
});
