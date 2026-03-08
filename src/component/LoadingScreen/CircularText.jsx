import './CircularText.css'

const CircularText = ({
    text,
    spinDuration = 20,
    className = '',
}) => {
    const letters = Array.from(text)

    return (
        <div
            className={`circular-text ${className}`}
            style={{
                '--spin-duration': `${spinDuration}s`
            }}
        >
            {letters.map((letter, i) => {
                const rotationDeg = (360 / letters.length) * i
                const transform = `translateX(-50%) rotateZ(${rotationDeg}deg)`

                return (
                    <span key={i} style={{ transform, WebkitTransform: transform }}>
                        {letter}
                    </span>
                )
            })}
        </div>
    )
}

export default CircularText
