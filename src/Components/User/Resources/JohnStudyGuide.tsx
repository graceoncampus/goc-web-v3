import { Template } from 'Components/User/Template/Template';
import { HeaderNavbarActiveKey } from '../Header/Header';
import './JohnStudyGuide.scss';

export const StudyGuide = () => {
    return (
        <Template activeKey={HeaderNavbarActiveKey.ABOUT} body={<StudyGuideBody />} />
    );
}

export const StudyGuideBody = () => {
    return (
        <div className="study-guide-body">
            <div className="study-guide-header">
                <h1 className="study-guide-title">John Study Guide</h1>
            </div>
            <div className="contaiser-mt-4">
                <div className="section-title">
                    <h2>The Gospel of John</h2>
                    <p>A study through the "I am" statements of Jesus</p>
                    <a href="/docs/john-study-guide.pdf" target="_blank" rel="noopener noreferrer" className="btn-btn-primary">
                        View Study Guide
                    </a>

                </div>
                <p className="study-paragraph">Here are some more resources to complement your study!</p>
                <div className="sections">
                    <div className="card mb-3">
                        <div className="card-header">Section 1</div>
                        <ul className="list-group">
                            <li className="list-group-item"><a href="https://www.gracechurch.org/sermons/14063">Who is Jesus? The Word</a></li>
                            <li className="list-group-item"><a href="https://www.gracechurch.org/sermons/15003">I Am Not the Christ</a></li>
                        </ul>
                    </div>

                    <div className="card mb-3">
                        <div className="card-header">Section 2</div>
                        <ul className="list-group">
                            <li className="list-group-item"><a href="https://www.gracechurch.org/sermons/4801">You Must Be Born Again</a></li>
                        </ul>
                    </div>

                    <div className="card mb-3">
                        <div className="card-header">Section 3</div>
                        <ul className="list-group">
                            <li className="list-group-item"><a href="https://www.gracechurch.org/sermons/15008">The Bread of Life</a></li>
                        </ul>
                    </div>

                    <div className="card mb-3">
                        <div className="card-header">Section 4</div>
                        <ul className="list-group">
                            <li className="list-group-item"><a href="https://www.gracechurch.org/sermons/15026">The Light of the World</a></li>
                        </ul>
                    </div>

                    <div className="card mb-3">
                        <div className="card-header">Section 5</div>
                        <ul className="list-group">
                            <li className="list-group-item"><a href="https://www.gracechurch.org/sermons/15045">The Door</a></li>
                            <li className="list-group-item"><a href="http://example.com/i-am-not-christ">The Good Shepherd</a></li>
                        </ul>
                    </div>

                    <div className="card mb-3">
                        <div className="card-header">Section 6</div>
                        <ul className="list-group">
                            <li className="list-group-item"><a href="https://www.gracechurch.org/sermons/15084">The Resurrection and the Life</a></li>
                        </ul>
                    </div>

                    <div className="card mb-3">
                        <div className="card-header">Section 7</div>
                        <ul className="list-group">
                            <li className="list-group-item"><a href="https://www.gracechurch.org/sermons/15101">The Way, the Truth and the Life</a></li>
                        </ul>
                    </div>

                    <div className="card mb-3">
                        <div className="card-header">Section 8</div>
                        <ul className="list-group">
                            <li className="list-group-item"><a href="https://www.gracechurch.org/sermons/15115">The True Vine</a></li>
                        </ul>
                    </div>

                    <div className="card mb-3">
                        <div className="card-header">Section 9</div>
                        <ul className="list-group">
                            <li className="list-group-item"><a href="https://www.gty.org/library/questions/QA66/every-easter-the-newspaper-runs-an-article-that-casts-doubt-on-the-resurrection-just-how-important-is-the-resurrection-to-the-christian-faith">How Important is the Resurrection?</a></li>
                        </ul>
                    </div>
                </div>
                <a href="https://forms.gle/8qDquok7Q48CbMQJ8" className="feedback-link">Feedback Form</a>
            </div>
        </div>
    );
};

export default StudyGuide;