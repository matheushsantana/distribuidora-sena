import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage => produto-select', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 1
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('produto-select => HomePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 1
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    //----------------------------------------------------------------

    transition('HomePage => categoria', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    transition('categoria => HomePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    //------------------------------------------------------------------

    transition('HomePage => pesquisa', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    transition('pesquisa => HomePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    //--------------------------------------------------------------------

    transition('HomePage => carrinho', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    transition('carrinho => HomePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    //---------------------------------------------------------------------

    transition('HomePage => pedido', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    transition('pedido => HomePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    //---------------------------------------------------------------------

    transition('HomePage => cadastro-cliente', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    transition('cadastro-cliente => HomePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    //----------------------------------------------------------------------

    transition('carrinho => cadastro-cliente', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    transition('cadastro-cliente => carrinho', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    //----------------------------------------------------------------------

    transition('produto-select => carrinho', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    transition('carrinho => produto-select', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    //----------------------------------------------------------------------

    transition('categoria => produto-select', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    transition('produto-select => categoria', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    //----------------------------------------------------------------------

    transition('carrinho => pedido', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    //----------------------------------------------------------------------

    transition('pesquisa => produto-select', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    transition('produto-select => pesquisa', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    //----------------------------------------------------------------------

    transition('produto-select => opcao', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    transition('opcao => HomePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    transition('opcao => carrinho', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ opacity: '0' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ opacity: '0' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
  ]);