import bg from '../../../public/images/collection/icons/countBackground.svg';

const Count = (props: {count: number | string}) => {
    if (!props.count || parseInt(props.count as string) <= 1) return <div className="count-display"/>;
    return <div className="count-display" style={{backgroundImage: `url(${bg.src})`}}>
        <span>x{props.count}</span>
    </div>
}

export default Count;