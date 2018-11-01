import React from 'react';

const About = () => {
  return (
    <div className="container">
      <h1 className="title">Welcome to Politik.</h1>
      <h2 className="subtitle">
        This website is here to try and make sense of Lobbying in the United
        States Government. Politik automatically gathers data from the
        ProPublica API each day as Lobbyists file their issues for the public
        record.
      </h2>
      <h2 className="subtitle">
        In the list (link to list) you can view a directory of Lobbyists and
        what/who they represent. Clicking a Lobbyists name will show only
        filings associated with that lobbyist.
      </h2>
      <h2 className="subtitle">
        In Words (link to words) you can view a cloud of words mentioned in
        Lobbyist filings. Click a word to view representations associated with
        that word.
      </h2>
      <h2 className="subtitle">
        What is Lobbying? As defined by Wikipedia
        (https://en.wikipedia.org/wiki/Lobbying): Lobbying, persuasion, or
        interest representation is the act of attempting to influence the
        actions, policies, or decisions of officials in their daily life, most
        often legislators or members of regulatory agencies. Lobbying is done by
        many types of people, associations and organized groups, including
        individuals in the private sector, corporations, fellow legislators or
        government officials, or advocacy groups (interest groups).
      </h2>
      <h2 className="subtitle">
        Heres a quick 6 minute video from RepresentUs
        (https://represent.us/about/) that outlines how Lobbying affects
        politics in the US. https://www.youtube.com/watch?v=5tu32CCA_Ig
      </h2>
      <h2>
        All data presented on this website comes from the ProPublica Data Store
        https://www.propublica.org/datastore/apis Politik was created by Mike
        Lyons (https://github.com/michaelyons), Connon Osburn
        (https://github.com/letsdothis64), and John Roemer (github.com/jtrtj)
      </h2>
    </div>
  );
};

export default About;
