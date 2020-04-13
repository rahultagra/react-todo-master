import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useForm from "hooks/useForm";
import { Button, Switch } from "@blueprintjs/core";
import { InputGroup } from "components/ui";
import styles from "./index.module.scss";
import AvatarInput from "./AvatarInput";
import CategoryInput from "./CategoryInput";
import DateTimeInput from "./DateTimeInput";

const initialValue = {
  icon: "",
  description: "",
  category: "1",
  location: "",
  isAllDay: false
};

const TodoForm = ({ addNewTodo, viewAll }) => {
  const [date, setDate] = useState(null);
  const { values, handleChange, handleSubmit, reset } = useForm({
    initialValue,
    onSubmit: fields => {
      addNewTodo({
        id: `${Date.now()}`,
        done: false,
        date,
        ...fields
      });
      setDate(null);
    }
  });

  const handleClear = field => reset(field);

  const handleDateChange = (newDate, isUserChange) => {
    if (isUserChange) setDate(newDate);
  };
  useEffect(() => {
    if (window && window.ADRUM && !viewAll) {
      const ajaxT = new window.ADRUM.events.Ajax();

      // set url
      ajaxT.url("http://localhost/#myRequest");

      // mark timings
      ajaxT.markSendTime(100);
      ajaxT.markFirstByteTime(200);
      ajaxT.markRespAvailTime(300);
      ajaxT.markRespProcTime(400);
      window.ADRUM.report(ajaxT);
      alert("here");
      window.ADRUM.markVirtualPageEnd();
    }

    //  return () => {
    //    if (window && window.ADRUM) {
    //   window.ADRUM.markVirtualPageEnd("TODO-FORM-COMPONENT-UNMOUNT");
    //    }
    //  };
  }, [viewAll]);

  const canSave = date && values.description && values.location && values.icon;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.todoIcon}>
        <AvatarInput icon={values.icon} onSelect={handleChange} />
      </div>
      <div className={styles.category}>
        <CategoryInput category={values.category} onSelect={handleChange} />
      </div>
      <div>
        <InputGroup
          name="description"
          placeholder="What I have to do? *"
          value={values.description}
          autoComplete="off"
          onChange={handleChange}
          onClear={handleClear}
        />
      </div>
      <div>
        <InputGroup
          name="location"
          placeholder="Where? *"
          value={values.location}
          autoComplete="off"
          onChange={handleChange}
          onClear={handleClear}
        />
      </div>
      <div className={styles.date}>
        <DateTimeInput
          date={date}
          isAllDay={values.isAllDay}
          onSelect={handleDateChange}
        />
        <div className={styles.allDay}>
          <Switch
            label="All day"
            checked={values.isAllDay}
            name="isAllDay"
            onChange={handleChange}
          />
        </div>
      </div>
      <span className={styles.hint}>* Required fields</span>
      <Button
        large
        minimal
        fill
        className={styles.saveButton}
        type="submit"
        disabled={!canSave}
      >
        ADD TASK
      </Button>
    </form>
  );
};

TodoForm.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  viewAll: PropTypes.bool.isRequired
};

export default TodoForm;
