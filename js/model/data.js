var referenceData = {
  workOrders : {
    "123" : {
      workOrderNumber : "123",
      workOrderType : "ZPMM",
      shortText : "short text",
      workCentre : "PM01",
      companyCode : "CC01",
      plant : "PL01",
      longText : "long texttttttttt",
      objectPart : "op1",
      causeCode : "cc2",
      damage : "d1",
      breakdownDuration : "2",
      breakdownDurationUnit : "u2",
      equipment : "This",
      equimentText : "text",
      equipment : "E123",
      functionalLocationText : "text",
      functionalLocation : "F123",
      operations : [
        {
          operationId : "1",
          workCentre : "Work Ctr1",
          unit : "day(s)",
          duration : "1",
          dateString : "19/05/2015"
        },
        {
          operationId : "2",
          workCentre : "Work Ctr2",
          unit : "day(s)",
          duration : "2",
          dateString : "19/05/2015"
        }
      ]
    },
    "456" : {
      workOrderNumber : "456",
      workOrderType : "ZPMM",
      shortText : "short text",
      workCentre : "PM01",
      companyCode : "CC01",
      plant : "PL01",
      longText : "really really long text",
      objectPart : "op2",
      causeCode : "cc2",
      damage : "d2",
      operations : [
        {
          operationId : "1",
          workCentre : "Work Ctr2",
          unit : "hour(s)",
          duration : "5",
          dateString : "23/07/2015"
        },
        {
          operationId : "2",
          workCentre : "Work Ctr3",
          unit : "hour(s)",
          duration : "4",
          dateString : "23/07/2015"
        }
      ]
    }
  },
  objectParts : [
    {
      id : "op0",
      text : "Object Part"
    },
    {
      id : "op1",
      text : "Part 1"
    },
    {
      id : "op2",
      text : "Part 2"
    },
    {
      id : "op3",
      text : "Part 3"
    }
  ],
  causeCodes : [
    {
      id : "cc0",
      text : "Cause Codes"
    },
    {
      id : "cc1",
      text : "Cause Code 1"
    },
    {
      id : "cc2",
      text : "Cause Code 2"
    }
  ],
  damage : [
    {
      id : "d0",
      text : "Damage 1"
    },
    {
      id : "d1",
      text : "Damage 2"
    },
    {
      id : "d2",
      text : "Damage 3"
    }
  ],
  units : [
    {
      id : "u1",
      text : "Unit"
    },
    {
      id : "u2",
      text : "Hour(s)"
    },
    {
      id : "u3",
      text : "Day(s)"
    }
  ]
}
