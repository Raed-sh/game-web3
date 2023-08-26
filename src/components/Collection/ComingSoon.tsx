import comingSoon from 'public/images/icons/Coming-soon.webp';

const ComingSoon = () => {
    return <div
        className='coming-soon'
        style={{
            backgroundImage: `url(${comingSoon.src})`,
            backgroundSize: 'cover',
        }}
    >
        <p>Coming Soon</p>
    </div>
}

export default ComingSoon;