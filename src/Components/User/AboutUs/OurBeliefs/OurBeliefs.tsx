import { Template } from 'Components/User/Template/Template';
import { HeaderNavbarActiveKey } from '../../Header/Header';

import './OurBeliefs.scss';

export const OurBeliefs = () => {
	return (
		<Template
			activeKey={HeaderNavbarActiveKey.BELIEFS}
			body={<OurBeliefsBody />}
		/>
	);
};

const OurBeliefsBody = () => {
	return (
		<div>
			<div className="overlay" id="small-groups">
				<h1>Our Beliefs</h1>
			</div>
			<div className="section-container">
				<div className="section">
					<h2>The Sinfulness of Man</h2>
					<body>
						When man was first created, man was in a perfect
						relationship with God. However, man sinned and disobeyed
						God’s law, ruining and distorting the perfect
						relationship between God and man. The Bible says that
						every man is guilty of sin and has offended God.
						According to God’s absolutely holy and just character,
						He cannot approve of evil and declares that the
						punishment for sin is death and eternity spent in hell.
						However, in His loving kindness and mercy, He provided a
						way for man to be saved from the punishment of sin!
						(Romans 3:22-23, Romans 3:10-12, Romans 1:18)
						{/* todo: add links to bible verses */}
					</body>
				</div>
				<div className="section">
					<h2>God's Plan of Redemption</h2>
					<body>
						God’s plan to save man from His wrath was carried out
						through Jesus Christ. God so loved the world that He
						sent his only Son that whoever believes in him shall not
						perish but have eternal life. In the face of
						persecution, suffering, and crucifixion, Jesus Christ
						never once gave into temptation and sinned. Instead,
						Jesus lived a completely righteous life and offered it
						up as a perfect sacrifice on behalf of all who would
						have faith in Him. Through Jesus’ death, God’s wrath is
						miraculously satisfied, the punishment is finally paid
						for, and man is fully forgiven of his sin. Three days
						after His crucifixion, Jesus resurrected victoriously
						from death, securing hope for all who would trust in
						Him. (John 3:16, 1 Corinthians 15:3-5, Romans 5:1,
						Romans 5:6, Romans 8:1)
					</body>
				</div>
				<div className="section">
					<h2>God's Call for Man to be Saved</h2>
					<body>
						Saving faith in Christ is a gracious gift of God where
						the Holy Spirit transforms a person’s heart and opens
						his/her eyes to the gospel. At the same time, God calls
						every person to wholeheartedly repent from their sin, to
						believe in and commit his/her life to Jesus Christ.
						(Romans 10:10-13, John 3:36, John 14:6, Ephesians 2:8-9,
						Romans 1:16)
					</body>
				</div>
			</div>
		</div>
	);
};
