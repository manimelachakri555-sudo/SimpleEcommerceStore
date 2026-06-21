import React, { useState } from "react";
import BpkCalendar, {
  CALENDAR_SELECTION_TYPE,
} from "bpk-component-calendar";
import BpkButton from "bpk-component-button";

import "bpk-component-calendar/dist/bpk-calendar.css";
import "bpk-component-button/dist/bpk-button.css";

function App() {
  const [date, setDate] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Flight Schedule</h1>

      <BpkCalendar
        id="calendar"
        onDateSelect={selectedDate => setDate(selectedDate)}
        date={date}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
        }}
      />

      <div style={{ marginTop: "20px" }}>
        <BpkButton onClick={() => alert("Button clicked!")}>
          Continue
        </BpkButton>
      </div>
    </div>
  );
}

export default App;