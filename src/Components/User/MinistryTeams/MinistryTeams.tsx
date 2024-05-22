import { HeaderNavbarActiveKey } from 'Components/User/Header/Header';
import { Template } from 'Components/User/Template/Template';

import './MinistryTeams.scss';

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
			activeKey={HeaderNavbarActiveKey.MINISTRY_TEAMS}
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

function slugify(text: string): string {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w\-]+/g, '') // Remove all non-word characters
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
}

const TeamsBody: React.FC<{ MinistryTeams: MinistryTeam[] }> = ({
	MinistryTeams,
}) => {
	return (
		<div className={'text-center'}>
			<h1 className="Teams">
				{/* TODO: Replace with page header component (future work)*/}
				<strong>Ministry Teams</strong>
			</h1>

			<div className="col-md-6 mx-auto px-3 py-4 my-2 order-md-1 left-align">
				<h2>List of Ministry Teams</h2>
				<hr />
				<ul>
					{MinistryTeams.map((MinistryTeam, index) => (
						<li key={index}>
							<a
								href={`#${slugify(MinistryTeam.title)}`}
								style={{ textDecoration: 'none' }}
							>
								{MinistryTeam.title}
							</a>
						</li>
					))}
				</ul>
				<hr className="mb-4" />

				{MinistryTeams.map((MinistryTeam, index) => (
					<div key={index} className="left-align mt-5">
						<h2 className="anchor" id={slugify(MinistryTeam.title)}>
							{MinistryTeam.title}
						</h2>
						<hr />
						<p>{MinistryTeam.description}</p>
						<p>
							<strong>Leader(s):</strong> {MinistryTeam.leaders}
						</p>
						<p>
							<strong>Contact:</strong> {MinistryTeam.contact}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};
