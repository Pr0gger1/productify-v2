import React, {FC} from 'react';
import { useAppSelector } from 'store';
import { selectedTaskGroupSelector } from 'store/selectors';
import Task from 'components/ui/cards/Task';
import { ITask, ITaskGroup } from 'types/TaskData';

import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';

interface AccordionProps {
    completedTasks: ITask[];
}

const CompletedTasksAccordion: FC<AccordionProps> = ({ completedTasks }) => {
	const selectedTaskGroup: ITaskGroup = useAppSelector(selectedTaskGroupSelector);

	if (completedTasks.length > 0 && selectedTaskGroup.id !== 'completed')
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
					completedTasks.map((task: ITask) =>
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

	return <></>;
};

export default CompletedTasksAccordion;