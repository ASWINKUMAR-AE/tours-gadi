import React, { useEffect, useState } from "react";
import { Users, Car, MapPin, Award } from "lucide-react";
import { dashboardService } from "../services/dashboardService";

interface StatsData {
  users: number;
  drivers: number;
  areas: number;
  rating: number;
}

/* ================= COUNTER COMPONENT ================= */
const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  duration?: number;
}> = ({ value, suffix = "", duration = 1200 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const current = Math.floor(progress * value);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};
/* ===================================================== */

const StatsSection: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService
      .getStats()
      .then((res) => {
        if (res.success) {
          setStats({
            users: res.stats.total,
            drivers: res.stats.completed,
            areas: res.stats.pending,
            rating: 4.8,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Stats fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-5 text-center bg-success text-white">
        Loading stats...
      </section>
    );
  }

  if (!stats) return null;

  return (
    <section className="stats-section py-5 my-5 bg-success text-white">
      <div className="container">
        <div className="row g-4">
          {[
            {
              icon: <Users size={40} />,
              value: stats.users,
              suffix: "+",
              label: "Total Bookings",
            },
            {
              icon: <Car size={40} />,
              value: stats.drivers,
              suffix: "+",
              label: "Completed Trips",
            },
            {
              icon: <MapPin size={40} />,
              value: stats.areas,
              suffix: "+",
              label: "Pending Trips",
            },
            {
              icon: <Award size={40} />,
              value: stats.rating,
              suffix: " ★",
              label: "User Satisfaction",
            },
          ].map((stat, index) => (
            <div key={index} className="col-6 col-md-3 text-center">
              <div className="stat-item">
                <div className="icon-wrapper mb-3 d-flex justify-content-center">
                  {stat.icon}
                </div>
                <h2 className="display-5 fw-bold mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </h2>
                <p className="mb-0 text-white-50">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
