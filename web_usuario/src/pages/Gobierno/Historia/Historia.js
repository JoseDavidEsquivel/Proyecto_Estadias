import { Container, Row, Col} from 'react-bootstrap';
import './Historia.css'; // Estilos para la pagina landing Home
import Navigator from '../../../components/Navigator/Navigator.js';
import LogoWhite from '../../../static/images/no_title_logo_white.png';

function Historia() {
    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Gobierno', path: '/gobierno', current: false },
        { name: 'Historia del Municipio', path: '/gobierno/historia_municipio', current: false },
        { name: 'Historia', path: '#', current: true },
      ];



    return (
        <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <Navigator links={navigatorLinks}/>

                    <hr className="separator" />

                    <div className='generic-container'>
                        <Row>
                            <h1 className='title-section'>HISTORIA</h1>
                            <p>Santiago Tulantepec estuvo lleno de historias épicas, personajes, retos y logros que han cimentado el sentido de pertenencia de cada
                            santiaguense. Este periodo sentó las bases de la identidad y la historia del municipio.</p>
                        </Row>
                        <div className='historia-main-container'>
                            <div className='historia-bar-container'>
                                <div className='historia-bar'/>
                            </div>
                            <div className='historia-content-container'>
                                <div className='historia-content-child'>
                                    <div className='historia-circles-container'>
                                        <div className='historia-circles'>
                                            <img src={LogoWhite} alt='Logo sin titulo blanco' className='historia-imagen-circle'/>
                                        </div>
                                    </div>
                                    <div className='historia-text-container'>
                                        <p className='subtitle-section'>2 de Agosto de 1565</p>
                                        <p>En esta fecha, la Corona Española, a través del Virrey de Peralta, otorgó una "merced al pueblo de Tulancingo para
    la fundación del molino Santiago, concediéndole el uso de los manantiales Los Cangrejos". Esta concesión marcó
    un hito importante en la historia del desarrollo económico de Santiago Tulantepec.</p>
                                    </div>
                                </div>

                                <div className='historia-content-child'>
                                    <div className='historia-circles-container'>
                                        <div className='historia-circles'>
                                            <img src={LogoWhite} alt='Logo sin titulo blanco' className='historia-imagen-circle'/>
                                        </div>
                                    </div>
                                    <div className='historia-text-container'>
                                        <p className='subtitle-section'>1870 </p>
                                        <p>En este año, los franceses Gotí y Pontal realizaron los primeros cambios en el molino Santiago al sustituir el
antiguo rodezno, que había estado en uso durante 300 años, por una novedosa turbina. Estos cambios
tecnológicos impulsaron la modernización de la producción en el molino.</p>
                                    </div>
                                </div>
                                
                                <div className='historia-content-child'>
                                    <div className='historia-circles-container'>
                                        <div className='historia-circles'>
                                            <img src={LogoWhite} alt='Logo sin titulo blanco' className='historia-imagen-circle'/>
                                        </div>
                                    </div>
                                    <div className='historia-text-container'>
                                        <p className='subtitle-section'>11 de septiembre de 1875 </p>
                                        <p>José Castellá adquirió el molino Santiago y, con el apoyo de Guillermo Hope, estableció un taller para hilar y tejer
algodón utilizando máquinas de segunda mano. Esta iniciativa marcó el inicio de la actividad industrial en
Santiago Tulantepec. </p>
                                    </div>
                                </div>
                                
                                <div className='historia-content-child'>
                                    <div className='historia-circles-container'>
                                        <div className='historia-circles'>
                                            <img src={LogoWhite} alt='Logo sin titulo blanco' className='historia-imagen-circle'/>
                                        </div>
                                    </div>
                                    <div className='historia-text-container'>
                                        <p className='subtitle-section'>1888 </p>
                                        <p>Don Martín Urrutia Escurra, un inmigrante vasco, adquirió el taller y emprendió un proyecto que lo llevaría a crear
una de las empresas más prósperas de su giro, la Fábrica de Hilados y Tejidos de Lana Santiago S.A. Esta empresa
no solo tuvo un impacto económico significativo en la comunidad, sino que también fue un catalizador del
movimiento independista liderado por los antepasados de Santiago Tulantepec. </p>
                                    </div>
                                </div>
                                
                                <div className='historia-content-child'>
                                    <div className='historia-circles-container'>
                                        <div className='historia-circles'>
                                            <img src={LogoWhite} alt='Logo sin titulo blanco' className='historia-imagen-circle'/>
                                        </div>
                                    </div>
                                    <div className='historia-text-container'>
                                        <p className='subtitle-section'>Aproximadamente 1934 </p>
                                        <p>En esta época, un grupo de obreros tejedores de la fábrica Santiago Textil compró el primer balón de fútbol. El
fútbol se convirtió en un deporte popular entre los obreros y jugó un papel trascendental en la independencia de
Santiago. </p>
                                    </div>
                                </div>
                                
                                <div className='historia-content-child'>
                                    <div className='historia-circles-container'>
                                        <div className='historia-circles'>
                                            <img src={LogoWhite} alt='Logo sin titulo blanco' className='historia-imagen-circle'/>
                                        </div>
                                    </div>
                                    <div className='historia-text-container'>
                                        <p className='subtitle-section'>1943 </p>
                                        <p>Durante un encuentro de fútbol entre el equipo de Santiago Tulantepec y Cuautepec, se desencadenó una fuerte
riña que fue el punto de quiebre. Los habitantes de Santiago se unieron para formar un Comité Pro Independencia,
con el objetivo de lograr el nombramiento de Santiago Tulantepec como municipio independiente. </p>
                                    </div>
                                </div>
                                
                                <div className='historia-content-child'>
                                    <div className='historia-circles-container'>
                                        <div className='historia-circles'>
                                            <img src={LogoWhite} alt='Logo sin titulo blanco' className='historia-imagen-circle'/>
                                        </div>
                                    </div>
                                    <div className='historia-text-container'>
                                        <p className='subtitle-section'>1 de abril de 1944 </p>
                                        <p>El decreto número 38, en la décimo tercera reforma del artículo III, del título I, Capítulo I del Territorio del Estado
y su División Política, fue publicado, otorgando oficialmente el nombramiento de Santiago Tulantepec como
municipio. Este fue un logro importante para la comunidad y marcó el inicio de su autonomía política y
administrativa. </p>
                                    </div>
                                </div>
                                
                                <div className='historia-content-child'>
                                    <div className='historia-circles-container'>
                                        <div className='historia-circles'>
                                            <img src={LogoWhite} alt='Logo sin titulo blanco' className='historia-imagen-circle'/>
                                        </div>
                                    </div>
                                    <div className='historia-text-container'>
                                        <p className='subtitle-section'>1947 </p>
                                        <p>Se concluyó la ejecución de la Presidencia Municipal, un edificio emblemático que se convirtió en el centro
                                        administrativo y político del municipio. </p>
                                    </div>
                                </div>
                                
                                <div className='historia-content-child'>
                                    <div className='historia-circles-container'>
                                        <div className='historia-circles'>
                                            <img src={LogoWhite} alt='Logo sin titulo blanco' className='historia-imagen-circle'/>
                                        </div>
                                    </div>
                                    <div className='historia-text-container'>
                                        <p className='subtitle-section'>1949 </p>
                                        <p>La edificación de la Parroquia en Honor a Santiago Apóstol fue concluida, lo que fortaleció aún más la identidad
                                        cultural y religiosa de Santiago Tulantepec. </p>
                                    </div>
                                </div>
                                
                                <div className='historia-content-child'>
                                    <div className='historia-circles-container'>
                                        <div className='historia-circles'>
                                            <img src={LogoWhite} alt='Logo sin titulo blanco' className='historia-imagen-circle'/>
                                        </div>
                                    </div>
                                    <div className='historia-text-container'>
                                        <p className='subtitle-section'>24 de abril de 1966 </p>
                                        <p>Se inauguró el Reloj Municipal, una donación de la Fábrica Santiago Textil S.A. y el Sindicato Obrero Textil del
Ramo de Lana "Libertad". Este reloj se convirtió en un símbolo icónico del municipio, marcando el paso del tiempo
y representando el progreso y la unidad de la comunidad. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </Col>
            </Row>
        </Container>
    );
  }
  
  export default Historia;