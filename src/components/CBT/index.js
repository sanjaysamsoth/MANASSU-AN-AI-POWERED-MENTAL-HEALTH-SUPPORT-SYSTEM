import React from "react";
import { Typography } from "@mui/material";
import "./cbt.css";

const CBT = () => {
  return (
    <div className="cbt">
      <Typography variant="h4" fontWeight="bold" align="center">
        Cognitive-behavioral therapy (CBT) Techniques and Resources
      </Typography>

      <div className="cbt-section">
        <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
          Cognitive Techniques
        </Typography>
        <Typography variant="body1">
          Cognitive techniques focus on identifying and changing negative thought patterns that contribute to emotions and behaviors.
        </Typography>
        <ul>
          <li>
            <a href="https://www.getselfhelp.co.uk/docs/ThoughtRecordSheet7.pdf" target="_blank" rel="noopener noreferrer">
              Thought Record Sheet
            </a> - Helps identify and reframe negative thoughts.
          </li>
          <li>
            <a href="https://positivepsychology.com/cognitive-distortions/" target="_blank" rel="noopener noreferrer">
              Cognitive Distortions
            </a> - Lists common negative thought patterns.
          </li>
        </ul>
      </div>

      <div className="cbt-section">
        <Typography variant="h5" fontWeight="bold">
          Behavioral Techniques
        </Typography>
        <Typography variant="body1">
          Behavioral techniques help individuals adopt healthier behaviors promoting positive thoughts.
        </Typography>
        <ul>
          <li>
            <a href="https://www.verywellmind.com/what-is-systematic-desensitization-2795459" target="_blank" rel="noopener noreferrer">
              Systematic Desensitization
            </a> - Gradually exposing oneself to feared situations.
          </li>
        </ul>
      </div>

      <div className="cbt-section">
        <Typography variant="h5" fontWeight="bold">
          Resources
        </Typography>
        <Typography variant="body1">
          Additional resources for learning more about CBT:
        </Typography>
        <ul>
          <li>
            <a href="https://www.nhs.uk/conditions/cognitive-behavioural-therapy-cbt/" target="_blank" rel="noopener noreferrer">
              NHS - Cognitive Behavioural Therapy (CBT)
            </a>
          </li>
          <li>
            <a href="https://www.beckinstitute.org/" target="_blank" rel="noopener noreferrer">
              Beck Institute for Cognitive Behavior Therapy
            </a>
          </li>
          <li>
            <a href="https://positivepsychology.com/cbt-cognitive-behavioral-therapy-techniques-worksheets/" target="_blank" rel="noopener noreferrer">
              Positive Psychology - CBT Techniques
            </a>
          </li>
          <li>
            <a href="https://www.excelatlife.com/cbt.htm" target="_blank" rel="noopener noreferrer">
              Excel at Life - CBT
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CBT;
