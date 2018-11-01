import React from 'react';

const About = () => {
  return (
    <div className="container">
      <h1 className="title">Welcome to Politik</h1>
      <h2 className="subtitle">
        This website is here to try and make sense of what is currently being
        lobbied for within the United States Government. Politik automatically
        gathers data from the ProPublica API each day as Lobbyists file their
        issues for the public record
      </h2>
      <h2 className="subtitle">
        <a href="/issues">Words</a> gives you a cloud of words mentioned in
        Lobbyist filings. Click a word to view representations associated with
        that word.
      </h2>
      <h2 className="subtitle">
        <a href="/most_recent">List</a> allows you to view a directory of
        Lobbyists and what/who they represent. Clicking a Lobbyists name will
        show only filings associated with that lobbyist.
      </h2>
      <h2 className="subtitle">
        What is Lobbying?
        <br />
        <a href="https://en.wikipedia.org/wiki/Lobbying">Wikipedia</a> defines
        Lobbying is a persuasion, or interest representation is the act of
        attempting to influence the actions, policies, or decisions of officials
        in their daily life, most often legislators or members of regulatory
        agencies. Lobbying is done by many types of people, associations and
        organized groups, including individuals in the private sector,
        corporations, fellow legislators or government officials, or advocacy
        groups (interest groups).
      </h2>
      <h2 className="subtitle">
        Heres a quick 6 minute video from{' '}
        <a href="https://represent.us/about/">RepresentUs</a> that outlines how
        Lobbying affects politics in the US.
        <iframe
          title="youtube-vid"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/5tu32CCA_Ig"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </h2>
      <h2>
        All data presented on this website comes from the{' '}
        <a href="https://www.propublica.org/datastore/apis">
          ProPublica Data Store
        </a>{' '}
      </h2>
      <h2>
        {' '}
        Politik was created by{' '}
        <a href="https://github.com/michaelyons">Michael Lyons,</a>{' '}
        <a href="https://github.com/letsdothis64">Connon Osburn,</a> and{' '}
        <a href="https://github.com/jtrtj">John Roemer</a>
      </h2>
    </div>
  );
};

export default About;
