import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'LetsPrep',
    description: `We aim to provide you a platform where you can enhance your knowledge, 
    learn from other's experiences & turn opportunities into outcomes.`,
    keywords: 'Interview experience, job openings and courses',
};

export default Meta;
