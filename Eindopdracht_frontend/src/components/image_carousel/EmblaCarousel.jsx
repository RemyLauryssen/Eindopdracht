import React, {useCallback} from 'react'
import {DotButton, useDotButton} from './EmblaCarouselDotButton.jsx'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons.jsx'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import photo1 from "../../assets/livingrooms/Huiskamer1.jpg"
import photo2 from "../../assets/livingrooms/Huiskamer2.jpg"
import photo3 from "../../assets/livingrooms/Huiskamer3.jpg"
import photo4 from "../../assets/livingrooms/Huiskamer4.jpg"
import photo5 from "../../assets/livingrooms/Huiskamer5.jpg"

const photos = [
    {
        name: photo1,
        source: photo1
    },
    {
        name: photo2,
        source: photo2
    },
    {
        name: photo3,
        source: photo3
    },
    {
        name: photo4,
        source: photo4
    }, {
        name: photo5,
        source: photo5
    }

]

const EmblaCarousel = (props) => {
    const {slides, options} = props
    const [emblaRef, emblaApi] = useEmblaCarousel(
        options,
        [
            Autoplay({
                delay: 3500,
                stopOnInteraction: false
            })
        ]
    )


    const onNavButtonClick = useCallback((emblaApi) => {
        const autoplay = emblaApi?.plugins()?.autoplay
        if (!autoplay) return

        const resetOrStop =
            autoplay.options.stopOnInteraction === false
                ? autoplay.reset
                : autoplay.stop

        resetOrStop()
    }, [])

    const {selectedIndex, scrollSnaps, onDotButtonClick} = useDotButton(
        emblaApi,
        onNavButtonClick
    )

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi, onNavButtonClick)


    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((index) => (
                        <div className="embla__slide" key={index}>
                            <img
                                className="embla__slide__img"
                                src={photos[index]?.source}
                                alt={`Afbeelding van huiskamer ${index + 1}`}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}/>
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}/>
                </div>

                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EmblaCarousel
