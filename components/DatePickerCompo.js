import React, { useState, useCallback } from 'react';
import { Tabs,Card } from "@shopify/polaris";


// export default function DatePickerExample() {
//     const [{month, year}, setDate] = useState({month: 1, year: 2018});
//     const [selectedDates, setSelectedDates] = useState({
//       start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
//       end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
//     });
  
//     const handleMonthChange = useCallback(
//       (month, year) => setDate({month, year}),
//       [],

//       console.log(month,year)
//     );
  
//     return (
//       <DatePicker
//         month={month}
//         year={year}
//         onChange={setSelectedDates}
//         onMonthChange={handleMonthChange}
//         selected={selectedDates}
//       />
//     );
//   }

  export default function DatePickerExample() {
    const [selected, setSelected] = useState(0);
  
    const handleTabChange = useCallback(
      (selectedTabIndex) => setSelected(selectedTabIndex),
      [],
    );
  
    const tabs = [
      {
        id: 'all-customers-1',
        content: 'All',
        accessibilityLabel: 'All customers',
        panelID: 'all-customers-content-1',
      },
      {
        id: 'accepts-marketing-1',
        content: 'Accepts marketing',
        panelID: 'accepts-marketing-content-1',
      },
      {
        id: 'repeat-customers-1',
        content: 'Repeat customers',
        panelID: 'repeat-customers-content-1',
      },
      {
        id: 'prospects-1',
        content: 'Prospects',
        panelID: 'prospects-content-1',
      },
    ];
  
    return (
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section title={tabs[selected].content}>
            <p>Tab {selected} selected</p>
          </Card.Section>
        </Tabs>
      </Card>
    );
  }