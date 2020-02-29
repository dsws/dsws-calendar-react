import React, { Component } from "react";
import "./DailyCalendar.css";

const containerHeight = 720;
const containerWidth = 600;
const minutesinDay = 60 * 12;
let collisions = [];
let width = [];
let leftOffSet = [];

class DailyCalendar extends Component {
  state = {
    eventNodes: []
  };

  componentDidMount = () => {
    this.layOutDay(this.props.events);
    window.layOutDay = this.layOutDay;
    // var eventNodes = this.layOutDay(this.props.events);
  };

  getCollisions = events => {
    //resets storage
    collisions = [];

    for (var i = 0; i < 24; i++) {
      var time = [];
      for (var j = 0; j < events.length; j++) {
        time.push(0);
      }
      collisions.push(time);
    }

    events.forEach((event, id) => {
      let end = event.end;
      let start = event.start;
      let order = 1;
      let timeIndex;

      while (start < end) {
        timeIndex = Math.floor(start / 30);

        while (order < events.length) {
          if (collisions[timeIndex].indexOf(order) === -1) {
            break;
          }
          order++;
        }

        collisions[timeIndex][id] = order;
        start = start + 30;
      }

      collisions[Math.floor((end - 1) / 30)][id] = order;
    });
  };

  /*
  find width and horizontal position
  
  width - number of units to divide container width by
  horizontal position - pixel offset from left
  */
  getAttributes = events => {
    //resets storage
    width = [];
    leftOffSet = [];

    for (var i = 0; i < events.length; i++) {
      width.push(0);
      leftOffSet.push(0);
    }

    collisions.forEach(period => {
      // number of events in that period
      let count = period.reduce((a, b) => {
        return b ? a + 1 : a;
      });

      if (count > 1) {
        period.forEach((event, id) => {
          // max number of events it is sharing a time period with determines width
          if (period[id]) {
            if (count > width[id]) {
              width[id] = count;
            }
          }

          if (period[id] && !leftOffSet[id]) {
            leftOffSet[id] = period[id];
          }
        });
      }
    });
  };

  EventNode = (height, top, left, units) => {
    const tinyMode = height <= 20;

    return (
      <div
        key={height + top + left}
        className="dailyCalendarNode"
        style={{
          width: containerWidth / units + "px",
          height: height + "px",
          top: top + "px",
          left: left + "px"
        }}
      >
        <div>
          <div
            className="dailyCalendarNodeTitle"
            style={{
              fontSize: height / 1.2 >= 16 ? 16 : height / 1.2,
              display: tinyMode ? "inline-block" : "block"
            }}
          >
            Sample Item
          </div>
          <div
            className="dailyCalendarNodeLocation"
            style={{
              fontSize: height / 1.2 >= 10 ? 10 : height / 1.2,
              display: tinyMode ? "inline-block" : "block",
              marginLeft: tinyMode ? "10px" : ""
            }}
          >
            Sample Location
          </div>
        </div>
      </div>
    );
  };

  //default events given
  // const events = [
  //   { start: 30, end: 150 },
  //   { start: 540, end: 600 },
  //   { start: 560, end: 620 },
  //   { start: 610, end: 670 }
  // ];

  layOutDay = events => {
    // clear any existing nodes
    // var myNode = document.getElementById("events");
    // myNode.innerHTML = "";

    this.getCollisions(events);
    this.getAttributes(events);
    const eventNodes = events.map((event, id) => {
      let height = ((event.end - event.start) / minutesinDay) * containerHeight;
      let top = (event.start / minutesinDay) * containerHeight;
      let units = width[id];
      if (!units) {
        units = 1;
      }
      let left = (containerWidth / width[id]) * (leftOffSet[id] - 1) + 10;
      if (!left || left < 0) {
        left = 10;
      }

      return this.EventNode(height, top, left, units);
    });
    this.setState({ eventNodes: eventNodes });
  };

  ///console.log("evetNodes", props);

  render() {
    return (
      <div className="dailyCalendarContainer">
        <div className="dailyCalendarTiming">
          <div>
            <span> 9:00 </span> AM
          </div>
          <div> 9:30 </div>
          <div>
            <span> 10:00 </span>AM
          </div>
          <div> 10:30 </div>
          <div>
            <span> 11:00 </span>AM
          </div>
          <div> 11:30 </div>
          <div>
            <span> 12:00 </span>PM
          </div>
          <div> 12:30 </div>
          <div>
            <span> 1:00 </span>PM
          </div>
          <div> 1:30 </div>
          <div>
            <span> 2:00 </span>PM
          </div>
          <div> 2:30 </div>
          <div>
            <span> 3:00 </span>PM
          </div>
          <div> 3:30 </div>
          <div>
            <span> 4:00 </span>PM
          </div>
          <div> 4:30 </div>
          <div>
            <span> 5:00 </span>PM
          </div>
          <div> 5:30 </div>
          <div>
            <span> 6:00 </span>PM
          </div>
          <div> 6:30 </div>
          <div>
            <span> 7:00 </span>PM
          </div>
          <div> 7:30 </div>
          <div>
            <span> 8:00 </span>PM
          </div>
          <div> 8:30 </div>
          <div>
            <span> 9:00 </span>PM
          </div>
        </div>

        <div className="dailyCalendarDays">{this.state.eventNodes}</div>
      </div>
    );
  }
}

export default DailyCalendar;
