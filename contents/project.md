#### Projects

#### 1. Toward a comprehensive understanding of excitation-dependent luminescence in triplet-triplet annihilation
**Abstract**: Triplet–triplet annihilation (TTA) is widely used in optical up-conversion and exciton-based devices due to its high energy efficiency.However, traditional kinetic models fail to capture the complex dynamics observed in many one-component organic TTA systems.This work proposes a generalized TTA kinetic model by incorporating additional excited states under different conditions and deriving a new formalism for luminescence intensity.The model provides a more universal criterion for identifying TTA behavior and offers a practical tool for analyzing systems with non-traditional kinetics.

**Method**: Kinetic modeling of triplet-triplet annihilation process, supported steady-state spectrum experiments and TDDFT simulations.  
**Results**: \
a. Two models, eleven cases
![TTA model](/static/assets/img/TTA_model.png)


b. General formalism： 

$$
I_{\text{em}} = N\left(Ck_{\text{ex}} + Ak_{\text{ex}} + B - \sqrt{B^2 + 2ABk_{\text{ex}}} \right)
$$

$$
\Phi_{\text{em}} = N\left(C + A + \frac{B}{k_{\text{ex}}} - \sqrt{\left( \frac{B}{k_{\text{ex}}} \right)^2 + \frac{2AB}{k_{\text{ex}}}} \right)
$$

Specific representations of parameters for different cases
![Parameters](/static/assets/img/TTA_parameter.png)


c.Experimental fitting formula:

$$
\Phi_{\text{em}} = c + a \left( 1 + \frac{1 - \sqrt{1 + 4d I_{\text{ex}}}}{2d I_{\text{ex}}} \right)
$$


Model results compared with experimental results 
![TTA result](/static/assets/img/TTA_comparation.png)


#### 3. Programmable Linearity of Organic All-Photonic Synapses for Neuromorphic Computing
**Abstract**: Organic synaptic devices with optical transmission and computing capabilities are crucial for neuromorphic information processing. Organic all-optical synapses (OAPS) offer a promising alternative by utilizing inherent optical signals. However, the current mechanisms often rely on photochemical or photoisomerization mechanisms, which inherently introduce nonlinearity. We established a physical model based on the CT and CS states to explain the mechanism of a new type of low-linearity OAPS material, and constructed the relationship between structure and performance.

**Method**: Kinetic analysis, organic all-optical synapses，charge-separated state.  
**Results**: \
a. CS state assisted emission model
![CS state assisted emission model](/static/assets/img/CS_model.png)

b. General formalism. \
Under continuous illumination:

$$
I_{\text{out}} = \Phi_{P} \Phi_{\text{ISC}} k_{\text{ex}} + \Phi_{P} \Phi_{\text{ET}} k_{\text{ex}} \left[1 + \alpha e^{\lambda_1 t} + \beta e^{\lambda_2 t} \right]
$$
