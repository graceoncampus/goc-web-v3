import { HeaderNavbarActiveKey } from 'Components/User/Header/Header';
import { Template } from 'Components/User/Template/Template';

import './MinistryTeams.scss';
import { Accordion } from 'react-bootstrap';

const mockTeams: MinistryTeam[] = [
	{
		title: 'Welcome and Follow Up Team',
		description:
			'Welcome and Follow Up is an outreach ministry team that exists to obey the call of Romans 15:7 to “welcome one another as Christ has welcomed you, for the glory of God”. We serve on Fridays during large group and have biweekly meetings every even Monday. Our ministry team seeks to encourage our members to grow a greater love for the church body and for nonbelievers through the means of outreach.',
		leaders: 'Cameron Ong, Britney Burnasky',
		contact: 'cameron262002@gmail.com, (650) 450-7321',
	},
	{
		title: 'Music Team',
		description:
			'Welcome and Follow Up is an outreach ministry team that exists to obey the call of Romans 15:7 to “welcome one another as Christ has welcomed you, for the glory of God”. We serve on Fridays during large group and have biweekly meetings every even Monday. Our ministry team seeks to encourage our members to grow a greater love for the church body and for nonbelievers through the means of outreach.',
		leaders: 'Cameron Ong, Britney Burnasky',
		contact: 'cameron262002@gmail.com, (650) 450-7321',
	},
	{
		title: 'Sound Team',
		description:
			'Welcome and Follow Up is an outreach ministry team that exists to obey the call of Romans 15:7 to “welcome one another as Christ has welcomed you, for the glory of God”. We serve on Fridays during large group and have biweekly meetings every even Monday. Our ministry team seeks to encourage our members to grow a greater love for the church body and for nonbelievers through the means of outreach.',
		leaders: 'Cameron Ong, Britney Burnasky',
		contact: 'cameron262002@gmail.com, (650) 450-7321',
	},
];

export const MinistryTeams: React.FC = () => {
	return (
		<Template
			activeKey={HeaderNavbarActiveKey.SMALL_GROUPS} // TODO: Add constant to template
			body={<TeamsBody MinistryTeams={mockTeams} />}
		/>
	);
};

interface MinistryTeam {
	title: string;
	description: string;
	leaders: string;
	contact: string;
}

const TeamsBody: React.FC<{ MinistryTeams: MinistryTeam[] }> = ({
	MinistryTeams,
}) => {
	return (
		<div className={'text-center'}>
			<h1 className="Teams">
				{/* TODO: Replace with page header */}
				<strong>Ministry Teams</strong>
			</h1>
			<h1 className="m-5">Upcoming Teams</h1>
			<div className="p-5 m-5 pt-0">
				<Accordion>
					{MinistryTeams.map((MinistryTeam, index) => (
            // Individual components go here
            
						<Accordion.Item key={index} eventKey={index.toString()}>
							<Accordion.Header>
								<div className="d-flex align-items-center justify-content-between w-100">
									<div className="d-flex align-items-center">
										<h2 className="m-0">
											{MinistryTeam.title}
										</h2>
									</div>
									<div className="d-flex align-items-center">
										<p className="m-0 text-center">
											{MinistryTeam.contact}
										</p>
									</div>
									<div className="d-flex align-items-center"></div>
								</div>
							</Accordion.Header>
							<Accordion.Body>
								<div className="Team-description">
									<div className="d-flex">
										<img
											width={'200px'}
											style={{ borderRadius: '20px' }}
											src=""
										/>
										<div className="Team-description-text">
											<div>
												<h1>{MinistryTeam.title}</h1>
												<p>
													{MinistryTeam.description}
												</p>
											</div>
										</div>
									</div>
								</div>
							</Accordion.Body>
						</Accordion.Item>
					))}
				</Accordion>
			</div>
		</div>
	);
};
