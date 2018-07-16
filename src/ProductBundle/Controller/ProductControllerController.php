<?php

namespace ProductBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Config\Definition\Exception\Exception;
use ProductBundle\Entity\Product;


class ProductControllerController extends Controller
{


    public function indexAction()
    {
        return $this->render('@Product/ProductController/index.html.twig');
    }


    public function formCreaProducAction(){
      $em = $this->getDoctrine()->getManager();
      $category = $em->getRepository('ProductBundle:Category')->findAll();
      return $this->render('@Product/ProductController/CreateProduct.html.twig', array(
        'category' => $category
      ));
    }

    public function laodProductAction($fatherId){
      $em = $this->getDoctrine()->getManager();
      $serializer = $this->get('jms_serializer');
      $brand = $em->getRepository('ProductBundle:Brand')->findBy( array('category' => $fatherId), array('id'=>'asc') );
      $brand = $serializer->serialize($brand, 'json');
      return new JsonResponse(json_decode($brand, true), 200);
    }

    public function saveProductAction(Request $request){
      $em = $this->getDoctrine()->getManager();
      $datos = $request->request->all();

      try {
        $productCode = $em->getRepository('ProductBundle:Product')->findOneBy(array('code' => $datos['code']));
        $productName = $em->getRepository('ProductBundle:Product')->findOneBy(array('name' => $datos['name']));
        if(!is_null($productCode)){
          throw new Exception("El codigo del producto ya existe");
        }else if(!is_null($productName)){
          throw new Exception("El nombre del prodcuto ya existe");

        }
        $brand = $em->getRepository('ProductBundle:Brand')->find($datos['brand']);
        $product = new Product();
        $product->setCode($datos['code']);
        $product->setName($datos['name']);
        $product->setDescription($datos['description']);
        $product->setPrice($datos['cost']);
        $product->setBrand($brand);
        $em->persist($product);
        $em->flush();

      }catch(\Exception $e){
        return new JsonResponse(array('error' => 1, 'mensaje' => $e->getMessage()), 200);
      }
      return new JsonResponse(array('error' => 0, 'mensaje' => "Se almaceno el Producto correctamente"), 200);
    }

    public function deleteProductAction($data){
      $em = $this->getDoctrine()->getManager();
      $product = $em->getRepository('ProductBundle:Product')->find($data);
        try{
            if(!is_null($product)){
                $em->remove($product);
                $em->flush();

            }
        }catch(Exception $e){
            print_r("Error al eliminar producto");
        }
        return new JsonResponse(array(true), 200);

    }

    public function showProductAction(){
      $em = $this->getDoctrine()->getManager();
      $product = $em->getRepository('ProductBundle:Product')->findAll();
      return $this->render('@Product/ProductController/showProduct.html.twig', array(
        'product' => $product
      ));
    }

    }
