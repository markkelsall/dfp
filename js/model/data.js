var referenceData = {
  workOrders : {
    "123" : {
      workOrderNumber : "123",
      shortText : "short text",
      workCentre : "PM01",
      companyCode : "CC01",
      plant : "PL01",
      longText : "long texttttttttt",
      objectPart : "objPart1",
      causeCode : "causeCode1",
      damage : "damage1",
      confirmedTime : [
        {
          workCentre : "Work Ctr1",
          unit : "day(s)",
          duration : "1",
          date : "19/05/2015"
        },
        {
          workCentre : "Work Ctr2",
          unit : "day(s)",
          duration : "2",
          date : "19/05/2015"
        }
      ]
    },
    "456" : {
      workOrderNumber : "456",
      shortText : "short text",
      workCentre : "PM01",
      companyCode : "CC01",
      plant : "PL01",
      longText : "really really long text",
      objectPart : "objPart1",
      causeCode : "causeCode1",
      damage : "damage1",
      confirmedTime : [
        {
          unit : "day",
          duration : "1",
          date : "19/05/2015"
        },
        {
          unit : "day",
          duration : "2",
          date : "19/05/2015"
        }
      ]
    }
  },
  objectParts : [
    {
      id : "0",
      text : "Object Part"
    },
    {
      id : "1",
      text : "Part 1"
    },
    {
      id : "2",
      text : "Part 2"
    },
    {
      id : ""
    }
  ],
  causeCodes : [

  ],
  damage : [

  ],
  units : [
    {
      id : "1",
      text : "Unit"
    },
    {
      id : "2",
      text : "Hour(s)"
    },
    {
      id : "3",
      text : "Day(s)"
    }
  ]
}
