import React from 'react';
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Task from "../../cards/Task";
import Accordion from "@mui/material/Accordion";

const CompletedTasksAccordion = ({ completedTasks }) => {
    return (
        <Accordion sx={{
                backgroundColor: 'var(--bgColorFirst)',
                color: 'var(--fontColor)',
            }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{color: 'var(--fontColor)'}}/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>
                    Завершенные
                </Typography>
            </AccordionSummary>
            {
                completedTasks.map((task) =>
                    <AccordionDetails key={task.id}>
                        <Task
                            key={task.id}
                            taskDataProps={task}
                        />
                    </AccordionDetails>
                    )
            }
        </Accordion>
    );
};

export default CompletedTasksAccordion;