import Head from 'next/head'
import { isMobile } from '../components/isMobile';
import { useScrollAndHeight } from '../components/useScrollAndHeight';

export default () => (
  <div>
    <Head>
      <meta property="og:title" content="Emin Furkan" />
      <meta property="og:url" content="https://eminfurkan.com/" />
    </Head>
    <Card />
  </div>
);

function Card() {
  const { scroll: ms, height: hei } = useScrollAndHeight(1);

  return (
    <div className="card-surface">
      <div className={ ms === hei ? 'card flipped' : ms > 0 ? 'card flipping' : 'card' }>
        <div className="card-front" style={flipFront(ms, hei)}>
          <em>Emin Furkan Tezeren</em>
        </div>
        <div className="card-edge" style={flipEdge(ms, hei)}></div>
        <div className="card-back" style={flipBack(ms, hei)}>
          <em>Software Developer</em>
          <a
            href="https://twitter.com/e_tezeren"
            target="_blank"
            rel="noopener noreferrer"
          >
            @e_tezeren
          </a>
          <a
            href="https://github.com/EminFurkan"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/EminFurkan
          </a>
          <a
            href="https://www.linkedin.com/in/emin-furkan/"
            target="_blank"
            rel="noopener noreferrer"
          >
          linkedin
          </a>
          <a
            href="mailto:&#101;&#109;&#105;&#110;&#116;&#101;&#122;&#101;&#114;&#101;&#110;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;"
            >
            &#101;&#109;&#105;&#110;&#116;&#101;&#122;&#101;&#114;&#101;&#110;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;
          </a>
          <a
            href="https://eminfurkan.medium.com"
            target="_blank"
            rel="noopener noreferrer">
              articles
          </a>
        </div>
      </div>
    </div>
  );
}

function transform(s: string) {
  return {
    transform: s,
    WebkitTransform: s
  }
}

function flipFront(s: number, hh: number) {
  if (s === 0 || isMobile()) return {}

  if (s < 0) return transform('translate3d(0' + -s + 'px, 0)');

  const dy = Math.min(hh, s) - (1 - Math.min(1, s / hh)) * s * Math.sin(2 * Math.PI * Math.min(1, s / hh)) - s;
  const dz = 100 * ((1 - Math.cos(2 * Math.PI *  Math.max(0, Math.min(1, (1.4 * s) / hh - 0.2)))) / 2);
  return transform(
    `translate3d(0,${dy}px,${dz}px)` +
    `rotateZ(${0.25 - 0.25 * (1 + Math.cos(Math.PI * Math.max(0, Math.min(1, (1.4 * s) / hh - 0.2)))) / 2}turn)` +
    `rotateX(${0.5 - 0.5 * (1 + Math.cos(Math.PI * Math.max(0, Math.min(1, (1.4 * s) / hh - 0.2)))) / 2}turn)` +
    'translateZ(3px)'
  );
}

function flipBack(s: number, hh: number) {
  if (s === 0 || isMobile()) return {}

  const dy = Math.min(hh, s) - (1 - Math.min(1, s / hh)) * s * Math.sin(2 * Math.PI * Math.min(1, s / hh)) - s;
  const dz = 100 * ((1 - Math.cos(2 * Math.PI *  Math.max(0, Math.min(1, (1.4 * s) / hh - 0.2)))) / 2);
  return transform(
    `translate3d(0,${dy}px,${dz}px)` +
    `rotateZ(${-0.25 - 0.25 * (1 + Math.cos(Math.PI * Math.max(0, Math.min(1, (1.4 * s) / hh - 0.2)))) / 2}turn)` +
    `rotateX(${1 + 0.5 * (1 + Math.cos(Math.PI * Math.max(0, Math.min(1, (1.4 * s) / hh - 0.2)))) / 2}turn)` +
    'rotateZ(90deg)'
  );
}

function flipEdge(s: number, hh: number) {
  if (s === 0 || isMobile()) return {}

  const dy = Math.min(hh, s) - (1 - Math.min(1, s / hh)) * s * Math.sin(2 * Math.PI * Math.min(1, s / hh)) - s;
  const dz = 100 * ((1 - Math.cos(2 * Math.PI *  Math.max(0, Math.min(1, (1.4 * s) / hh - 0.2)))) / 2);
  return transform(
    `translate3d(0,${dy}px,${dz}px)` +
    `rotateZ(${0.25 - 0.25 * (1 + Math.cos(Math.PI * Math.max(0, Math.min(1, (1.4 * s) / hh - 0.2)))) / 2}turn)` +
    `rotateX(${1 - 0.5 * (1 + Math.cos(Math.PI * Math.max(0, Math.min(1, (1.4 * s) / hh - 0.2)))) / 2}turn)` +
    'translateY(-50%)' +
    'rotateX(0.25turn)'
  )
}