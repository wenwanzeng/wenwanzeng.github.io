
---

#### I. Toward a comprehensive understanding of excitation-dependent luminescence in triplet-triplet annihilation
**Abstract**: Triplet–triplet annihilation (TTA) is widely used in optical up-conversion and exciton-based devices due to its high energy efficiency.However, traditional kinetic models fail to capture the complex dynamics observed in many one-component organic TTA systems.This work proposes a generalized TTA kinetic model by incorporating additional excited states under different conditions and deriving a new formalism for luminescence intensity.The model provides a more universal criterion for identifying TTA behavior and offers a practical tool for analyzing systems with non-traditional kinetics.

**Method**: Kinetic modeling of triplet-triplet annihilation process, supported steady-state spectrum experiments and TDDFT simulations.  
**Results**: \
a. Two models, eleven cases
<img src="/static/assets/img/TTA_model.png" style="width: 100%; height: auto;" />

b. General formalism： 

$$
I_{\text{em}} = N\left(Ck_{\text{ex}} + Ak_{\text{ex}} + B - \sqrt{B^2 + 2ABk_{\text{ex}}} \right)
$$

$$
\Phi_{\text{em}} = N\left(C + A + \frac{B}{k_{\text{ex}}} - \sqrt{\left( \frac{B}{k_{\text{ex}}} \right)^2 + \frac{2AB}{k_{\text{ex}}}} \right)
$$

Specific representations of parameters for different cases
<img src="/static/assets/img/TTA_parameter.png" style="width: 100%; height: auto;" />


c.Experimental fitting formula:

$$
\Phi_{\text{em}} = c + a \left( 1 + \frac{1 - \sqrt{1 + 4d I_{\text{ex}}}}{2d I_{\text{ex}}} \right)
$$


Model results compared with experimental results 
<img src="/static/assets/img/TTA_comparation.png" style="width: 100%; height: auto;" />


---

#### II Mechanism of organic phosphorescent synapse 
**Abstract**: In 2023, [Chen et al.](https://doi.org/10.1021/jacs.2c13471) reported the first organic all-optical synapse, achieving contactless optical information input and output. Under aerobic conditions, the fluorescence intensity of the organic all-optical synapse reported by them would continuously increase with the duration of excitation light irradiation (accumulative effect), and after a brief interruption of light irradiation, the initial luminescence intensity after re-excitation would be stronger than the previous one (memory effect). They proved that the three processes of triplet state production, TTA occurrence, and oxygen existed in the behavior of the optical synapse, and attributed the properties of the optical synapse to a process through which the concentration of S₃ excitons was constantly replenished, which included:  (i) ISC (S₁ → T₁) and ET (³O₂ + T₁ → ¹O₂ + S₀),  (ii) TTA (T₁ + T₁ → T₉ + S₀), and  (iii) ET (¹O₂ + T₉ → S₃ + ³O₂),  and studied the influence of ISC on the synaptic performance. Therefore, my work started from the dynamics, obtained the changes in luminescence intensity over time through non-steady-state solutions, the changes in luminescence intensity with the incident light intensity at the non-steady-state stage, and finally constructed a three-step cyclic mechanism to explain the synaptic effect and cumulative effect.


**Method**: Kinetic analysis.  
**Results**: \
Three-step cyclic mechanism
<img src="/static/assets/img/Three_step.png" style="width: 100%; height: auto;" />

---

#### III Programmable Linearity of Organic All-Photonic Synapses for Neuromorphic Computing
**Abstract**: Organic synaptic devices with optical transmission and computing capabilities are crucial for neuromorphic information processing. Organic all-optical synapses (OAPS) offer a promising alternative by utilizing inherent optical signals. However, the current mechanisms often rely on photochemical or photoisomerization mechanisms, which inherently introduce nonlinearity. We established a physical model based on the CT and CS states to explain the mechanism of a new type of low-linearity OAPS material, and constructed the relationship between structure and performance.

**Method**: Kinetic analysis，quantum calculation.  
**Results**: \
a. CS state assisted emission model
<img src="/static/assets/img/CS_model.png" style="width: 100%; height: auto;" />


b. General formalism. \
Under continuous illumination:

$$
I_{\text{out}} = \Phi_{P} \Phi_{\text{ISC}} k_{\text{ex}} + \Phi_{P} \Phi_{\text{ET}} k_{\text{ex}} \left[1 + \alpha e^{\lambda_1 t} + \beta e^{\lambda_2 t} \right]
$$

---
