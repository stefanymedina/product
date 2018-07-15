<?php

namespace ProductBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

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

}
