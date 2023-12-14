import { useState, useEffect } from 'react';

const Anecdotes: React.FC = () => {
    const [anecdotes, setAnecdotes] = useState<string[]>([]);
    const [selected, setSelected] = useState<number>(0);
    const [votes, setVotes] = useState<number[]>([]);

    useEffect(() => {
        // Fetch anecdote data from the server when the component mounts
        fetch('http://localhost:3001/api/anecdotes')
            .then((response) => {
                return response.json();
            }).then((data: string[]) => {
                setAnecdotes(data);
                setVotes(new Array(data.length).fill(0));
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once on mount


    const handleNextAnecdote = () => {
        const randomIndex = Math.floor(Math.random() * anecdotes.length);
        setSelected(randomIndex);
    };

    const handleVote = () => {
        const newVotes = [...votes];
        newVotes[selected] += 1;
        setVotes(newVotes);
    };

    const mostVotedIndex = votes.indexOf(Math.max(...votes));

    return (
        <div>
            <div>
                {anecdotes[selected]} <br />
                Votes: {votes[selected]}
            </div>
            <button onClick={handleVote}>Vote</button>
            <button onClick={handleNextAnecdote}>Next Anecdote</button>
            <h2>Most Voted Anecdote</h2>
            <div>
                {anecdotes[mostVotedIndex]} <br />
                Votes: {votes[mostVotedIndex]}
            </div>
        </div>
    );
};

export default Anecdotes;
