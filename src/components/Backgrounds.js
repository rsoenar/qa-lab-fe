import Particles from "react-tsparticles";

const AuthBackground = () => (
  <Particles
    id="tsparticles"
    options={{
      background: {
        color: {
          value: "#000",
        },
      },
      backgroundMode: {
        enable: true,
      },
      fpsLimit: 60,
      interactivity: {
        detect_on: "canvas",
        events: {
          onclick: {
            enable: true,
            mode: "repulse",
          },
          onhover: {
            enable: true,
            mode: "bubble",
            parallax: {
              enable: false,
              force: 2,
              smooth: 10,
            },
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 200,
            duration: 2,
            opacity: 0,
            size: 0,
            speed: 2,
          },
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
          repulse: {
            distance: 400,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        line_linked: {
          color: "#ffffff",
          distance: 150,
          enable: false,
          opacity: 0.4,
          width: 1,
        },
        move: {
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 600,
          },
          bounce: false,
          direction: "none",
          enable: true,
          out_mode: "out",
          random: true,
          speed: 0.01,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 600,
        },
        opacity: {
          anim: {
            enable: true,
            opacity_min: 0.3,
            speed: 5,
            sync: false,
          },
          random: {
            enable: true,
            minimumValue: 0.3,
          },
          value: 0.6,
        },
        shape: {
          type: "circle",
        },
        size: {
          anim: {
            enable: false,
            size_min: 0.3,
            speed: 4,
            sync: false,
          },
          random: false,
          value: 1,
        },
      },
      retina_detect: true,
    }}
  />
);

const AppBackground = () => (
  <Particles
    id="tsparticles"
    options={{
      background: {
        color: {
          value: "#FFFFFFFF",
        },
      },
      backgroundMode: {
        enable: true,
      },
      detectRetina: true,
      fpsLimit: 60,
      interactivity: {
        detectsOn: "canvas",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.75,
            size: 40,
          },
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 25,
            duration: 0.4,
          },
        },
      },
      particles: {
        collisions: {
          enable: true,
        },
        color: {
          value: ["#4791db", "#1976d2", "#115293"],
        },
        links: {
          color: "#1976d2",
          distance: 100,
          enable: true,
          opacity: 0.25,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outMode: "bounce",
          random: false,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 1000,
          },
          value: 150,
        },
        opacity: {
          value: 0.75,
        },
        shape: {
          type: "circle",
        },
        size: {
          random: true,
          value: 3,
        },
      },
    }}
  />
);

export { AuthBackground, AppBackground };
