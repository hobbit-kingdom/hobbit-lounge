'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { CSSProperties } from 'react';
import ImageView from '@/components/ImageView';

import Section from '@/components/Section';
import Navbar from '@/components/Navbar';
import { sectionsArray } from '@/components/variables/sectionsArray';
import './AnimatedText.css';
import { title } from 'process';

const snapToSection = (
  nextSectionId: string,
  callback: (param: string) => void
) => {
  const nextSection = document.getElementById(nextSectionId);
  if (nextSection) {
    const scrollPos = nextSection.offsetTop;
    window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    callback(nextSectionId);
  }
};

const IndexPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>('section1');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let closestSectionId = '';
      let closestDistance = Infinity;

      sections.forEach((section: Element) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSectionId = section.id;
        }
      });

      setCurrentSection(closestSectionId);
    };

    const handleMouseWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = Math.sign(event.deltaY);
      const currentSectionIndex = sections.findIndex(
        (section) => section.id === currentSection
      );
      const nextSectionIndex = Math.max(
        0,
        Math.min(sections.length - 1, currentSectionIndex + delta)
      );
      const nextSectionId = sections[nextSectionIndex].id;
      snapToSection(nextSectionId, setCurrentSection);
    };

    const sections = Array.from(document.querySelectorAll('section'));

    document.addEventListener('scroll', handleScroll);
    handleScroll();

    document.addEventListener('wheel', handleMouseWheel);

    return () => {
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('wheel', handleMouseWheel);
    };
  }, [currentSection]);

  const outline: CSSProperties = {
    outline: '1px solid rgba(211, 211, 211, 0.2)',

    outlineOffset: '-10px',
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [imageArrayModal, setImageArrayModal] = useState({
    image1: '/images/back-0.jpg',
    image2: '/images/back-0.jpg',
    image3: '/images/back-0.jpg',
    title: 'sos',
    desc: 'ss',
  });

  const toggleModal = (imageArray: {
    image1: string;
    image2: string;
    image3: string;
    title: string;
    desc: string;
  }) => {
    setImageArrayModal({
      image1: imageArray.image1,
      image2: imageArray.image2,
      image3: imageArray.image3,
      title: imageArray.title,
      desc: imageArray.desc,
    });

    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    // Function to animate text on component mount
    const animateText = () => {
      const textElement = document
        .querySelector('#' + currentSection)
        ?.querySelector('p');

      const headerElement = document
        .querySelector('#' + currentSection)
        ?.querySelector('h1');

      textElement?.classList.add('slide-from-right');
      headerElement?.classList.add('slide-from-right-header');

      setTimeout(() => textElement?.classList.remove('slide-from-right'), 1000);
      setTimeout(
        () => headerElement?.classList.remove('slide-from-right-header'),
        1700
      );
    };
    // Call the animation function when component mounts
    animateText();

    // Cleanup function to remove event listener
    return () => {
      // Remove event listener or cleanup if needed
    };
  }, [currentSection]); // Empty dep

  return (
    <div>
      <Head>
        <title>Scrolling Sections</title>
        {/* Add any other necessary meta tags */}
      </Head>

      <Navbar id={5}></Navbar>

      <nav className='fixed top-0 left-0 h-full z-50 flex flex-col justify-center pl-10'>
        <ul className='flex flex-col items-start space-y-4'>
          {sectionsArray.map((section, index) => (
            <li
              key={index}
              className={
                currentSection === section.id ? 'font-bold' : 'font-light'
              }
            >
              <button
                onClick={() => snapToSection(section.id, setCurrentSection)}
              >
                <Image
                  src={
                    currentSection === section.id
                      ? 'icons/RectIn.svg'
                      : 'icons/RectOut.svg'
                  }
                  alt='*'
                  width={45}
                  height={12}
                  priority
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {modalOpen && (
        <ImageView
          image1={imageArrayModal.image1}
          image2={imageArrayModal.image2}
          image3={imageArrayModal.image3}
          title={imageArrayModal.title}
          desc={imageArrayModal.desc}
          onClose={() => setModalOpen(!modalOpen)}
        />
      )}
      {sectionsArray.map((section, index) =>
        section.id === 'main' ? (
          <Section key={index} id={section.id} background={section.background}>
            <div className='flex h-screen w-screen justify-center items-end flex-col'>
              <div className='flex flex-col items-center mr-[8rem]'>
                <Image
                  src={'/images/logo.png'}
                  height={340}
                  width={440}
                  alt={''}
                ></Image>
                <p>A project, driven by community</p>
                <div className='flex items-center justify-center gap-8 mt-[3rem]'>
                  <Image
                    src={'/icons/PlayNow.svg'}
                    height={140}
                    width={150}
                    alt={''}
                  ></Image>
                  <h1>Watch trailer</h1>
                </div>
              </div>
            </div>
            <p className='font-thin absolute bottom-10 text-yellow-400'>
              scroll down
            </p>
            <Image
              src={'/icons/LineDown.svg'}
              height={60}
              width={0.5}
              alt={''}
              className='absolute bottom-0'
            ></Image>
          </Section>
        ) : section.id === 'description' ? (
          <Section key={index} id={section.id} background={section.background}>
            Description
          </Section>
        ) : section.id === 'playnow' ? (
          <Section key={index} id={section.id} background={section.background}>
            <div className='h-screen w-screen pt-[10rem] flex flex-col items-center justify-start text-black'>
              <h1 className='text-2xl mb-[2rem]'>Select your game version</h1>
              <div className='flex mx-[8rem]'>
                <div className='flex justify-center'>
                  <img
                    src={'/images/hobbit.jpg'}
                    alt='*'
                    className='max-w-full h-auto cursor-pointer'
                    onClick={() =>
                      window.open(
                        'https://github.com/hobbit-kingdom/hobbit-versions',
                        '_blank'
                      )
                    }
                  />
                </div>
                <div className='flex justify-center'>
                  <img
                    src={'/images/hobbit.jpg'}
                    alt='*'
                    className='max-w-full h-auto cursor-pointer'
                    onClick={() =>
                      window.open(
                        'https://github.com/hobbit-kingdom/hobbit-versions',
                        '_blank'
                      )
                    }
                  />
                </div>
                <div className='flex justify-center'>
                  <img
                    src={'/images/hobbit.jpg'}
                    alt='*'
                    className='max-w-full h-auto cursor-pointer'
                    onClick={() =>
                      window.open(
                        'https://github.com/hobbit-kingdom/hobbit-versions',
                        '_blank'
                      )
                    }
                  />
                </div>
              </div>
              <p className='text-1xl mt-[2rem]'>
                Explore the world of The Hobbit via various platfroms
              </p>
              <div className='flex gap-20 justify-center items-center mt-[5rem]'>
                <Image
                  src={'/icons/ps2.png'}
                  alt='*'
                  width={200}
                  height={140}
                  priority
                  className='cursor-pointer'
                  onClick={() =>
                    window.open(
                      'https://github.com/hobbit-kingdom/hobbit-versions',
                      '_blank'
                    )
                  }
                />
                <Image
                  src={'/icons/gamecube.png'}
                  alt='*'
                  width={200}
                  height={140}
                  priority
                  className='cursor-pointer'
                  onClick={() =>
                    window.open(
                      'https://github.com/hobbit-kingdom/hobbit-versions',
                      '_blank'
                    )
                  }
                />
                <Image
                  src={'/icons/xbox.png'}
                  alt='*'
                  width={200}
                  height={140}
                  priority
                  className='cursor-pointer'
                  onClick={() =>
                    window.open(
                      'https://github.com/hobbit-kingdom/hobbit-versions',
                      '_blank'
                    )
                  }
                />
              </div>
            </div>
          </Section>
        ) : (
          <Section key={index} id={section.id} background={section.background}>
            <div className='h-screen w-screen flex flex-col items-end text-right  font-thin text-white mt-[10rem] mr-[3rem]'>
              <h1 className=' text-4xl mt-[3rem]'>{section.title}</h1>
              <p className='text-1xl max-w-[25rem] mt-[1rem] animate-text'>
                {section.description}
              </p>
              <div className='grid grid-cols-2 grid-rows-2 gap-8 mt-[4rem]'>
                <div>
                  <Image
                    style={outline}
                    src={section.imageArr.image1.image1}
                    alt='*'
                    width={270}
                    height={140}
                    priority
                    className='cursor-pointer'
                    onClick={() => toggleModal(section.imageArr.image1)}
                  />
                  <p className='flex justify-center'>
                    {section.imageArr.image1.title}
                  </p>
                </div>
                <div>
                  <Image
                    style={outline}
                    src={section.imageArr.image2.image1}
                    alt='*'
                    width={270}
                    height={140}
                    priority
                    className='cursor-pointer'
                    onClick={() => toggleModal(section.imageArr.image2)}
                  />
                  <p className='flex justify-center'>
                    {section.imageArr.image2.title}
                  </p>
                </div>
                <div>
                  <Image
                    style={outline}
                    src={section.imageArr.image3.image1}
                    alt='*'
                    width={270}
                    height={140}
                    priority
                    className='cursor-pointer'
                    onClick={() => toggleModal(section.imageArr.image3)}
                  />
                  <p className='flex justify-center'>
                    {section.imageArr.image3.title}
                  </p>
                </div>
                <div>
                  <Image
                    style={outline}
                    src={section.imageArr.image4.image1}
                    alt='*'
                    width={270}
                    height={140}
                    priority
                    className='cursor-pointer'
                    onClick={() => toggleModal(section.imageArr.image4)}
                  ></Image>
                  <p className='flex justify-center'>
                    {section.imageArr.image4.title}
                  </p>
                </div>
              </div>
            </div>
          </Section>
        )
      )}

      {/* Add more sections as needed */}
    </div>
  );
};

export default IndexPage;
