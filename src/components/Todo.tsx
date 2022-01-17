import React, { useEffect, useRef, useState } from "react";

export interface Props {
  id: number;
  name: string;
  completed: boolean;
  editTask: (id: number, newName: string) => void;
  deleteTask: (id: number) => void;
  toggleTaskCompleted: (id: number) => void;
}

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props: Props) {
  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLInputElement>(null);
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');  
  const wasEditing = usePrevious(isEditing);

  useEffect(() => {
    if (editFieldRef.current) {
      if (!wasEditing && isEditing) {
        editFieldRef.current?.focus();
      }
    }
    if (editButtonRef.current) {
      if (wasEditing && !isEditing) {
        editButtonRef.current?.focus();
      }
    }
  }, [wasEditing, isEditing]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>

      <div className="form-group">
        <label className="todo-label" htmlFor={String(props.id)}>
          New name for {props.name}
        </label>
        <input
          id={props.id + ""}
          className="todo-text"
          type="text"
          value={newName || props.name}
          onChange={handleChange}
          ref={editFieldRef}
        />

      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>

        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id + ""}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
          ref={editButtonRef}
        />
        <label className="todo-label" htmlFor={String(props.id)}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>

        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;

}


