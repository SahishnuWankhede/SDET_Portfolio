import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, Target, XCircle } from 'lucide-react';
import { spotBugRounds } from '../data/spotBugRounds';
import './SpotBugGame.css';

const scoreMessages = {
  5: "You'd catch my bugs too.",
  4: 'Sharp eye. Production would feel safer with you around.',
  3: 'Solid tester instincts. A little more exploratory testing and you are there.',
  2: 'Good start. The next regression run is your training ground.',
  1: 'Every bug is a clue. Time to inspect the evidence again.',
  0: 'The bugs escaped this round. Good testers learn from every failure.',
};

export default function SpotBugGame() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [finished, setFinished] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const round = spotBugRounds[roundIndex];
  const answered = selectedIndex !== null;

  useEffect(() => {
    setSelectedIndex(null);
  }, [roundIndex]);

  const chooseAnswer = (index) => {
    if (answered) return;
    setSelectedIndex(index);
    if (index === round.correctIndex) setScore((current) => current + 1);
  };

  const nextRound = () => {
    if (roundIndex === spotBugRounds.length - 1) setFinished(true);
    else setRoundIndex((current) => current + 1);
  };

  const restart = () => {
    setRoundIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setFinished(false);
    setGameKey((current) => current + 1);
  };

  return <>
    <a className="bug-launcher" href="#spot-the-bug" aria-label="Jump to Spot the Bug game"><Target size={15} /> Spot the Bug</a>
    <section className="spot-bug-section" id="spot-the-bug" aria-labelledby="spot-bug-title" key={gameKey}>
      <div className="spot-bug-shell">
        <div className="spot-bug-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-line" />05 / TESTER INSTINCTS</p>
            <h2 id="spot-bug-title">Spot the <span>Bug.</span></h2>
          </div>
          <p>Five quick rounds. Find the line a careful tester would question first.</p>
        </div>
        {!finished ? <div className="spot-bug-game" aria-live="polite">
          <div className="spot-bug-meta"><span>ROUND {round.id} / {spotBugRounds.length}</span><strong>SCORE {score}</strong></div>
          <div className="spot-bug-progress" aria-label={`Round ${round.id} of ${spotBugRounds.length}`}><span style={{ width: `${(round.id / spotBugRounds.length) * 100}%` }} /></div>
          <div className={`spot-bug-card ${answered && selectedIndex !== round.correctIndex ? 'is-wrong' : ''}`}>
            <div className="spot-bug-card-heading"><span className="round-number">0{round.id}</span><div><span className="spot-bug-kicker">{round.title}</span><h3>{round.context}</h3></div></div>
            <div className="code-editor" role="listbox" aria-label="Choose the buggy line">
              {round.lines.map((line, index) => <button key={`${round.id}-${index}`} className={`code-line ${selectedIndex === index ? (index === round.correctIndex ? 'is-correct' : 'is-wrong') : ''} ${answered && index === round.correctIndex ? 'show-correct' : ''}`} onClick={() => chooseAnswer(index)} role="option" aria-selected={selectedIndex === index} aria-label={`Line ${index + 1}: ${line}`}><span className="line-number">{String(index + 1).padStart(2, '0')}</span><code>{line}</code>{selectedIndex === index && (index === round.correctIndex ? <CheckCircle2 size={16} /> : <XCircle size={16} />)}</button>)}
            </div>
            <div className={`spot-bug-feedback ${answered ? 'is-visible' : ''}`} role="status"><strong>{answered ? (selectedIndex === round.correctIndex ? 'Correct catch.' : 'Not this time.') : 'Choose the line you would flag.'}</strong>{answered && <><p>{round.explanation}</p><p><b>Fix:</b> {round.fix}</p></>}</div>
            <button className="spot-bug-next" onClick={nextRound} disabled={!answered}>{roundIndex === spotBugRounds.length - 1 ? 'See my result' : 'Next round'} <ArrowRight size={16} /></button>
          </div>
        </div> : <div className="spot-bug-result" aria-live="polite"><div className="result-icon"><Target size={28}/></div><p className="spot-bug-kicker">FINAL RESULT</p><h3>{score} <span>/ {spotBugRounds.length}</span></h3><p>{scoreMessages[score]}</p><div className="result-actions"><button className="spot-bug-next" onClick={restart}><RotateCcw size={16}/> Play again</button><a className="spot-bug-contact" href="#contact">Want a tester who finds the bugs before users do? Contact me <ArrowRight size={16}/></a></div></div>}
      </div>
    </section>
  </>;
}
